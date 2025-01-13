import { randomUUID } from 'node:crypto';
import {
  AlreadyExistsError,
  AlreadyExistsErrorType,
  ValidationError,
} from '@/application/error';
import { RegisterUsecase } from '@/application/usecases';
import { Course, EmailType, StudentRegistrationStatus } from '@/domain';
import { container } from '@/infra/container';
import { StudentPrismaRepository } from '@/infra/orm/prisma/repositories';
import { DispatchEmailJobService } from '@/infra/services/bullMq';
import { BcryptPasswordHash } from '@/infra/services/password';
import { RegisterUsecaseZodValidator } from '@/infra/services/shared/zod';
import { faker } from '@faker-js/faker';
import { getError } from '@tests/helper';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import Sinon from 'sinon';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('RegisterUsecase', () => {
  let usecase: RegisterUsecase;
  let sinon: Sinon.SinonSandbox;

  beforeAll(() => {
    usecase = container.get(RegisterUsecase.Name);
    sinon = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinon.restore();
  });

  it('should be create a user', async () => {
    const input = {
      course: faker.helpers.arrayElement(Object.values(Course)),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      registration: `${faker.number.int({
        min: 1,
        max: 2,
      })}${faker.string.numeric(8)}`,
    };

    const studentEmail = String().concat(input.registration, '@aluno.unb.br');
    const validate = sinon
      .stub(RegisterUsecaseZodValidator.prototype, 'validate')
      .resolves(input);
    const findRepo = sinon
      .stub(StudentPrismaRepository.prototype, 'findBy')
      .resolves(undefined);
    const createRepo = sinon
      .stub(StudentPrismaRepository.prototype, 'create')
      .resolves({
        id: faker.string.uuid(),
        name: input.name,
        avatar: '',
        avatarUrl: '',
        course: input.course,
        email: studentEmail,
        password: input.password,
        rankingParticipant: false,
        registration: input.registration,
        status: StudentRegistrationStatus.PENDING,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

    const hashPassword = sinon
      .stub(BcryptPasswordHash.prototype, 'hash')
      .resolves(input.password);
    const dispatchEmail = sinon
      .stub(DispatchEmailJobService.prototype, 'dispatch')
      .resolves();

    const student = await usecase.execute(input);

    expect(student).toEqual({
      studentId: expect.any(String),
      status: StudentRegistrationStatus.PENDING,
      createdAt: expect.any(Date),
    });
    expect(validate.calledOnceWithExactly(input)).toBeTruthy();
    expect(
      findRepo.calledOnceWithExactly({
        where: {
          registration: input.registration,
        },
      }),
    ).toBeTruthy();
    expect(hashPassword.calledOnceWithExactly(input.password)).toBeTruthy();
    expect(
      createRepo.calledOnceWithExactly({
        id: randomUUID(),
        name: input.name,
        email: studentEmail,
        registration: input.registration,
        course: input.course,
        status: StudentRegistrationStatus.PENDING,
        password: input.password,
        rankingParticipant: false,
        avatar: '',
        avatarUrl: '',
        questions: [],
        seasons: [],
        updatedAt: sinon.match.instanceOf(Date),
        createdAt: sinon.match.instanceOf(Date),
      }),
    );
    expect(
      dispatchEmail.calledOnceWithExactly({
        data: {
          studentId: student.studentId,
          type: EmailType.REGISTRATION,
        },
      }),
    ).toBeTruthy();
  });

  it('should not be create a user when already exists', async () => {
    const input = {
      course: faker.helpers.arrayElement(Object.values(Course)),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      registration: `${faker.number.int({
        min: 1,
        max: 2,
      })}${faker.string.numeric(8)}`,
    };

    const validate = sinon
      .stub(RegisterUsecaseZodValidator.prototype, 'validate')
      .resolves(input);
    const findRepo = sinon
      .stub(StudentPrismaRepository.prototype, 'findBy')
      .resolves(StudentBuilder.aStudent().get());

    const hashPassword = sinon
      .stub(BcryptPasswordHash.prototype, 'hash')
      .resolves(input.password);
    const dispatchEmail = sinon
      .stub(DispatchEmailJobService.prototype, 'dispatch')
      .resolves();

    const error = await getError<AlreadyExistsError>(() =>
      usecase.execute(input),
    );

    expect(error).toBeInstanceOf(AlreadyExistsError);
    expect({ ...error }).toEqual({
      name: 'AlreadyExistsError',
      message: 'ESTUDANTE já existe',
      status: 400,
      type: AlreadyExistsErrorType.ESTUDANTE,
      fields: undefined,
    } as AlreadyExistsError);
    expect(validate.calledOnceWithExactly(input)).toBeTruthy();
    expect(
      findRepo.calledOnceWithExactly({
        where: {
          registration: input.registration,
        },
      }),
    ).toBeTruthy();
    expect(hashPassword.notCalled).toBeTruthy();
    expect(dispatchEmail.notCalled).toBeTruthy();
  });

  it('should throw ValidationError', async () => {
    const input = {
      course: faker.helpers.arrayElement(Object.values(Course)),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      registration: '333333333',
    };

    const validate = sinon
      .stub(RegisterUsecaseZodValidator.prototype, 'validate')
      .throws(
        new ValidationError([
          {
            path: ['registration'],
            message: 'registration must be a valid registration',
          },
        ]),
      );

    const findRepo = sinon
      .stub(StudentPrismaRepository.prototype, 'findBy')
      .resolves();
    const hashPassword = sinon
      .stub(BcryptPasswordHash.prototype, 'hash')
      .resolves();
    const dispatchEmail = sinon
      .stub(DispatchEmailJobService.prototype, 'dispatch')
      .resolves();

    const error = await getError<ValidationError>(() => usecase.execute(input));

    expect(error).toBeInstanceOf(ValidationError);
    expect({ ...error }).toEqual({
      fields: [
        {
          message: 'registration must be a valid registration',
          path: ['registration'],
        },
      ],
      message: 'Atributos inválidos',
      name: 'ValidationError',
      showMessage: false,
      status: 400,
    } as ValidationError);
    expect(validate.calledOnceWithExactly(input)).toBeTruthy();
    expect(findRepo.notCalled).toBeTruthy();
    expect(hashPassword.notCalled).toBeTruthy();
    expect(dispatchEmail.notCalled).toBeTruthy();
  });
});
