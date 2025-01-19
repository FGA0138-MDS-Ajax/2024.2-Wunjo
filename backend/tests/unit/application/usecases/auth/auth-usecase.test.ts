import { AuthUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { JWTStudentTokenManager } from '@/infra/services';
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
    const verify = sandbox
      .stub(JWTStudentTokenManager.prototype, 'verify')
      .resolves(true);

    const output = await usecase.execute(input);

    expect(output).toBeTruthy();
    expect(verify.calledOnceWithExactly(input.token)).toBeTruthy();
  });

  it('should not be able to validate a token', async () => {
    const verify = sandbox
      .stub(JWTStudentTokenManager.prototype, 'verify')
      .resolves(false);

    const output = await usecase.execute(input);

    expect(output).toBeFalsy();
    expect(verify.calledOnceWithExactly(input.token)).toBeTruthy();
  });
});
