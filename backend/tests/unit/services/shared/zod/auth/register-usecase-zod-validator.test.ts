import { ValidationError } from '@/application/error';
import { Course } from '@/domain';
import { RegisterUsecaseZodValidator } from '@/infra/services/shared/zod/auth';
import { getError } from '@tests/helper';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test case register use case validator', () => {
  let validator: RegisterUsecaseZodValidator;

  beforeAll(() => {
    validator = new RegisterUsecaseZodValidator();
  });

  it('should validate use case input correctly', async () => {
    const input = {
      name: 'John Doe',
      course: Course.ENG,
      password: '12345678',
      registration: '232001649',
    };

    const output = await validator.validate(input);

    expect(output).toEqual({
      name: 'John Doe',
      course: Course.ENG,
      password: '12345678',
      registration: '232001649',
    });
  });

  it('should throw an ValidationError if course doesnt match with enum', async () => {
    const input = {
      name: 'John Doe',
      course: '34212321',
      password: '12345678',
      registration: '332001649',
    };

    const output = await getError<ValidationError>(() =>
      validator.validate(input),
    );

    expect(output).instanceOf(ValidationError);
    expect(output.status).toBe(400);
    expect(output.fields).toEqual([
      {
        received: '34212321',
        code: 'invalid_enum_value',
        options: expect.any(Array),
        path: ['course'],
        message: `Invalid enum value. Expected 'ENG' | 'SOFTWARE' | 'AEROSPACE' | 'ENERGY' | 'AUTOMOTIVE' | 'ELETRONIC', received '34212321'`,
      },
    ]);
  });

  it('should throw an ValidationError if registration doesnt match with pattern', async () => {
    const input = {
      name: 'John Doe',
      course: Course.ENG,
      password: '12345678',
      registration: '332001649',
    };

    const output = await getError<ValidationError>(() =>
      validator.validate(input),
    );

    expect(output).instanceOf(ValidationError);
    expect(output.status).toBe(400);
    expect(output.fields).toEqual([
      {
        code: 'custom',
        message: 'Invalid input',
        path: [],
      },
    ]);
  });
});
