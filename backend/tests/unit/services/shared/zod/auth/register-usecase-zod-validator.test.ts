import { ValidationError } from '@/application/error';
import { Course } from '@/domain';
import { RegisterUsecaseZodValidator } from '@/infra/services/shared/zod/auth';
import { faker } from '@faker-js/faker';
import { getError } from '@tests/helper';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test case register use case validator', () => {
  let validator: RegisterUsecaseZodValidator;
  const input = {
    name: faker.person.fullName(),
    course: faker.helpers.enumValue(Course),
    password: faker.string.alphanumeric({
      length: {
        min: 8,
        max: 255,
      },
    }),
    registration: `${faker.number.int({
      max: 2,
      min: 1,
    })}${faker.string.numeric({ length: 8 })}`,
  };

  beforeAll(() => {
    validator = new RegisterUsecaseZodValidator();
  });

  it('should validate use case input correctly', async () => {
    const output = await validator.validate(input);

    expect(output).toEqual({
      name: input.name,
      course: input.course,
      password: input.password,
      registration: input.registration,
    });
  });

  it('should throw an ValidationError if course doesnt match with enum', async () => {
    const course = faker.string.alphanumeric();
    const output = await getError<ValidationError>(() =>
      validator.validate({
        ...input,
        course,
      }),
    );

    expect(output).instanceOf(ValidationError);
    expect(output.status).toBe(400);
    expect(output.fields).toEqual([
      {
        received: course,
        code: 'invalid_enum_value',
        options: expect.any(Array),
        path: ['course'],
        message: `Invalid enum value. Expected 'ENG' | 'SOFTWARE' | 'AEROSPACE' | 'ENERGY' | 'AUTOMOTIVE' | 'ELETRONIC', received '${course}'`,
      },
    ]);
  });

  it('should throw an ValidationError if registration doesnt match with pattern', async () => {
    const output = await getError<ValidationError>(() =>
      validator.validate({
        ...input,
        registration: `${faker.number.int({
          min: 3,
          max: 9,
        })}${faker.string.numeric({ length: 8 })}`,
      }),
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
