import { StudentTokenManager } from '@/application/services';

export class AuthUsecase {
  public static Name = 'AuthUsecase' as const;

  constructor(private readonly studentTokenManager: StudentTokenManager) {}

  async execute(input: AuthUsecase.Input): Promise<AuthUsecase.Output> {
    const isValidToken = await this.studentTokenManager.verify(input.token);

    return isValidToken;
  }
}

export namespace AuthUsecase {
  export type Input = {
    token: string;
  };

  export type Output = boolean;
}
