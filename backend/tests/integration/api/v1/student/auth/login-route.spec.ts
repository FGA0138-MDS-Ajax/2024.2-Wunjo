import { api } from '@/api';
import { env } from '@/env';
import { container } from '@/infra/container';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('[POST] /api/v1/student/auth/login', async () => {
  const password = 'CoolPassword*123';

  const studentBuilder = StudentBuilder.aStudent().withParams({
    password: await container.get('PasswordHash').hash(password),
  });

  const student = studentBuilder.get();

  beforeAll(async () => {
    await studentBuilder.save();
  });

  afterAll(async () => {
    await container.get('pgDataSource')
      .$queryRaw`TRUNCATE TABLE students RESTART IDENTITY CASCADE;`;
  });

  it('Should be able to login', async () => {
    const response = await request(api)
      .post('/api/v1/student/auth/login')
      .send({
        registration: student.registration,
        password,
      })
      .expect(200);

    expect(response.body).toEqual({
      accessToken: expect.any(String),
      expiresAt: env.JWT_TOKEN_EXPIRATION,
    });
  });

  it('Should throws 400 ValidationError', async () => {
    const response = await request(api)
      .post('/api/v1/student/auth/login')
      .send({
        registration: '123',
        password,
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

  it('Should throws 401 Unauthenticateduser', async () => {
    const response = await request(api)
      .post('/api/v1/student/auth/login')
      .send({
        registration: student.registration,
        password: 'WrongPassword*123',
      })
      .expect(401);

    expect(response.body).toEqual({
      type: 'UnauthenticatedError',
      message: 'Usuário não foi autenticado!',
      stack: expect.any(String),
    });
  });
});
