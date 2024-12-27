import { StudentTokenManager, StudentTokenManagerGenerateInput } from '@/application/services';
import { JWTStudentTokenManager } from '@/infra/services/token/jwt-token-manager';
import { faker } from '@faker-js/faker';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Test case jwt token manager service', () => {
  let studentTokenManager: StudentTokenManager;
  const input: StudentTokenManagerGenerateInput = {
    studentId: faker.string.uuid(),
  };
  beforeAll(() => {
    studentTokenManager = new JWTStudentTokenManager();
  });

  it('should generate a JWT token', async () => {
    const output = await studentTokenManager.generate(input);
    expect(typeof output).toBe('string');
  });

  it('should generate a JWT token and verify it', async () => {
    const token: string = await studentTokenManager.generate(input);

    const output = await studentTokenManager.verify(token);

    expect(output).toBe(true);
  });

  it('should generate a JWT token and decrypt it', async () => {
    const token: string = await studentTokenManager.generate(input);

    const output = await studentTokenManager.decrypt(token);
    expect(output).toBeInstanceOf(Object);
    expect(output).toEqual({
      student_id: input.studentId,
      iat: expect.any(Number),
      exp: expect.any(Number),
      iss: 'UnBordo',
    });
  });
});
