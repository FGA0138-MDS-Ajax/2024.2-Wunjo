import { AuthUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { StudentPrismaRepository } from '@/infra/orm/prisma/repositories';
import { JWTStudentTokenManager } from '@/infra/services';
import { getError } from '@tests/helper';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import Sinon from 'sinon';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('AuthUsecase', async () => {
  let sandbox: Sinon.SinonSandbox;
  let usecase: AuthUsecase;
  const input = {
    token: 'valid_token',
  };

  beforeAll(() => {
    sandbox = Sinon.createSandbox();
    usecase = container.get(AuthUsecase.Name);
  });

  beforeEach(() => {
    sandbox.restore();
  });

  it('should be able to validate a token', async () => {
    const student = StudentBuilder.aStudent().get();

    const verify = sandbox
      .stub(JWTStudentTokenManager.prototype, 'decrypt')
      .resolves({
        studentId: student.id,
      });

    const findBy = sandbox
      .stub(StudentPrismaRepository.prototype, 'findBy')
      .resolves(student);

    const output = await usecase.execute(input);

    expect(output).toEqual(student);
    expect(verify.calledOnceWithExactly(input.token)).toBeTruthy();
    expect(
      findBy.calledOnceWithExactly({
        where: {
          id: student.id,
        },
      }),
    );
  });

  it('should not be able to validate a token', async () => {
    const verify = sandbox
      .stub(JWTStudentTokenManager.prototype, 'decrypt')
      .rejects(new Error('Invalid token'));

    const output = await getError<Error>(() => usecase.execute(input));

    expect(output).toBeInstanceOf(Error);
    expect(verify.calledOnceWithExactly(input.token)).toBeTruthy();
  });
});
