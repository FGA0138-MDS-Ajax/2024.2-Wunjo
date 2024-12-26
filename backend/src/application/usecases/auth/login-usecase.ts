export class LoginUsecase {
  public static Name = 'LoginUsecase' as const;

  constructor() {}
  async execute(
    _input: LoginUsecase.Input,
  ): Promise<LoginUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace LoginUsecase {
  export type Input = {
    registration: string;
    password: string;
  };

  export type Output = {
    accessToken: string;
    expiresAt: string;
  };
}
