import { api } from '@/api';
import { RegisterUsecase } from '@/application/usecases';
import { Course, StudentRegistrationStatus } from '@/domain';
import { env } from '@/env';
import { EmailCacheRepository } from '@/infra/cache/repositories';
import { container } from '@/infra/container';
import { DispatchEmailJobService } from '@/infra/services';
import { faker } from '@faker-js/faker';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import Sinon from 'sinon';
import { agent as request } from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

const ENDPOINT = '/api/v1/student/auth/register';

describe('[POST] /api/v1/student/auth/register', async () => {
  let sandbox: Sinon.SinonSandbox;

  const password = 'CoolPassword*123';

  const input: RegisterUsecase.Input = {
    course: faker.helpers.objectKey(Course),
    name: faker.person.firstName(),
    registration: '232001649',
    password,
  };

  beforeAll(async () => {
    sandbox = Sinon.createSandbox();

    sandbox.stub(DispatchEmailJobService.prototype, 'dispatch').resolves();
    sandbox.stub(EmailCacheRepository.prototype, 'create').resolves();
  });

  afterAll(async () => {
    await container.get('pgDataSource')
      .$queryRaw`TRUNCATE TABLE students RESTART IDENTITY CASCADE;`;
  });

  it('Should be able to login', async () => {
    const response = await request(api).post(ENDPOINT).send(input).expect(201);

    expect(response.body).toEqual({
      studentId: expect.any(String),
      status: StudentRegistrationStatus.PENDING,
      createdAt: expect.any(String),
    });
  });

  it('Should throw 400 ValidationError', async () => {
    const response = await request(api)
      .post(ENDPOINT)
      .send({
        ...input,
        registration: '123',
      })
      .expect(400);

    expect(response.body).toEqual({
      type: 'ValidationError',
      message: 'Atributos inválidos',
      errors: [
        {
          code: 'too_small',
          type: 'string',
          minimum: 9,
          inclusive: true,
          exact: true,
          message: 'String must contain exactly 9 character(s)',
          path: ['registration'],
        },
      ],
      stack: expect.any(String),
    });
  });

  it('Should throw 400 AlreadyExistsError when student already exists', async () => {
    await container.get('pgDataSource').$queryRaw`TRUNCATE TABLE students RESTART IDENTITY CASCADE;`;

    await StudentBuilder.aStudent().withParams({
      registration: input.registration,
    }).save();

    const response = await request(api)
      .post(ENDPOINT)
      .send({
        ...input,
      })
      .expect(400);

    expect(response.body).toEqual({
      type: 'AlreadyExistsError',
      message: 'ESTUDANTE já existe',
      stack: expect.any(String),
    });

    await container.get('pgDataSource').$queryRaw`TRUNCATE TABLE students RESTART IDENTITY CASCADE;`;
  });
});
