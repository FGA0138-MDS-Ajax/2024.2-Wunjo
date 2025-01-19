import {
  UnauthenticatedError,
  ValidationError,
} from '@/application/error';
import { NotFoundError } from '@/application/error/not-found-error';
import { LoginUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { StudentPrismaRepository } from '@/infra/orm/prisma/repositories';
import { BcryptPasswordHash } from '@/infra/services/password';
import { LoginUsecaseZodValidator } from '@/infra/services/shared/zod';
import { JWTStudentTokenManager } from '@/infra/services/token';
import { faker } from '@faker-js/faker';
import { getError } from '@tests/helper';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import Sinon from 'sinon';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('LoginUsecase', () => {
  let usecase: LoginUsecase;
  let sinon: Sinon.SinonSandbox;

  beforeAll(() => {
    usecase = container.get(LoginUsecase.Name);
    sinon = Sinon.createSandbox();
  });

  beforeEach(() => {
    sinon.restore();
  });

  it('should log in a user with correct credentials', async () => {

    const student = StudentBuilder.aStudent().get();
      
    const input = {
      registration: student.registration,
      password: student.password,
    };
      
    const validate = sinon
      .stub(LoginUsecaseZodValidator.prototype, 'validate')
      .resolves(input);
    const findRepo = sinon
      .stub(StudentPrismaRepository.prototype, 'findBy')
      .resolves(student);
    const comparePwHash = sinon
      .stub(BcryptPasswordHash.prototype, 'compare')
      .resolves(true);
    const tokenStub = sinon
      .stub(JWTStudentTokenManager.prototype, 'generate')
      .resolves('fake-jwt-token');
    
    const result = await usecase.execute(input);
    
    expect(validate.calledOnceWithExactly(input)).toBeTruthy();
    expect(
      findRepo.calledOnceWithExactly({
        registration: input.registration,
      }),
    ).toBeTruthy();
    expect(
      comparePwHash.calledOnceWithExactly(input.password, student.password)
    ).toBeTruthy();
    expect(
      tokenStub.calledOnceWithExactly({ studentId: student.registration })
    ).toBeTruthy();
    expect(result).toEqual({
      accessToken: 'fake-jwt-token',
      expiresAt: '7 days',
    });  
  });
  
  it('should throw NotFoundError when user does not exist', async () => {
    const input = {
      registration: faker.string.numeric(9),
      password: faker.internet.password(),
    };

    const validate = sinon
      .stub(LoginUsecaseZodValidator.prototype, 'validate')
      .resolves(input);
    const findRepo = sinon
      .stub(StudentPrismaRepository.prototype, 'findBy')
      .resolves(undefined);
    const comparePwHash = sinon
      .stub(BcryptPasswordHash.prototype, 'compare')
      .resolves();
    const tokenStub = sinon
      .stub(JWTStudentTokenManager.prototype, 'generate')
      .resolves();

    const error = await getError<NotFoundError>(() => 
      usecase.execute(input),
  );

    expect(error).toBeInstanceOf(NotFoundError);
    expect(error.message).toBe('User not found');

    expect(validate.calledOnceWithExactly(input)).toBeTruthy();
    expect(
      findRepo.calledOnceWithExactly({
        registration: input.registration,
      })
    ).toBeTruthy();
    expect(comparePwHash.notCalled).toBeTruthy();
    expect(tokenStub.notCalled).toBeTruthy();
  });

  it('should throw UnauthenticatedError when password is incorrect', async () => {
    
    const student = StudentBuilder.aStudent().get();

    const input = {
      registration: student.registration,
      password: 'definitelymypassword123456',
    };

    const validate = sinon
      .stub(LoginUsecaseZodValidator.prototype, 'validate')
      .resolves(input);
    const findRepo = sinon
      .stub(StudentPrismaRepository.prototype, 'findBy')
      .resolves(student);
    const comparePwHash = sinon
      .stub(BcryptPasswordHash.prototype, 'compare')
      .resolves();

    const error = await getError<UnauthenticatedError>(() => 
      usecase.execute(input)
    );
    expect(error).toBeInstanceOf(UnauthenticatedError);

    expect(validate.calledOnceWithExactly(input)).toBeTruthy();
    expect(
      findRepo.calledOnceWithExactly({
        registration: input.registration,
      })
    ).toBeTruthy();
    expect(
      comparePwHash.calledOnceWithExactly(input.password, student.password)
    ).toBeTruthy();
  });
  
  it('should throw ValidationError for invalid input', async () => {
    const input = {
      registration: 'invalid_reg',
      password: faker.internet.password(),
    };

    const validate = sinon
    .stub(LoginUsecaseZodValidator.prototype, 'validate')
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
    const comparePwHash = sinon
      .stub(BcryptPasswordHash.prototype, 'compare')
      .resolves();
    const tokenStub = sinon
      .stub(JWTStudentTokenManager.prototype, 'generate')
      .resolves();

    const error = await getError<ValidationError>(() => 
      usecase.execute(input)
    );

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
    expect(comparePwHash.notCalled).toBeTruthy();
    expect(tokenStub.notCalled).toBeTruthy();
  });
});