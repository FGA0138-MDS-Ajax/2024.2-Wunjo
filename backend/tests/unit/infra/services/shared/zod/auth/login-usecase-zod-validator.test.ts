import { ValidationError } from '@/application/error';
import { LoginUsecaseZodValidator } from '@/infra/services/shared/zod/auth/login-usecase-zod-validator';
import { getError } from '@tests/helper';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test case login usecase validator', () => {
  let validator: LoginUsecaseZodValidator;

  beforeAll(() => {
    validator = new LoginUsecaseZodValidator();
  });

  it('should validate use case input correctly', async () => {
    const input = {
      registration: '232001649',
      password: '12345678',
    };

    const output = await validator.validate(input);

    expect(output).toEqual({
      registration: '232001649',
      password: '12345678',
    });
  });

  it('should throw an ValidationError if registration doesnt match with pattern', async () => {
    const input = {
      registration: '332001649',
      password: '12345678',
    };

    const output = await getError<ValidationError>(() =>
      validator.validate(input),
    );

    expect(output).instanceOf(ValidationError);
    expect(output.status).toBe(400);
    expect(output.fields).toEqual([
      {
        code: 'custom',
        message: 'A matrícula deve começar com 1 ou 2',
        path: ['registration'],
      },
    ]);
  });

  it('should throw an ValidationError if the password size doesnt match the condition', async () => {
    const input = {
      registration: '232001649',
      password: '1234567',
    };

    const output = await getError<ValidationError>(() =>
      validator.validate(input),
    );

    expect(output).instanceOf(ValidationError);
    expect(output.status).toBe(400);
    expect(output.fields).toEqual([
      {
        code: 'too_small',
        exact: false,
        inclusive: true,
        minimum: 8,
        type: 'string',
        message: 'String must contain at least 8 character(s)',
        path: ['password'],
      },
    ]);
  });
});
