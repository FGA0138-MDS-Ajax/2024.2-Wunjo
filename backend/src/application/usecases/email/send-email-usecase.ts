import { EmailTypes } from '@/domain';

export class SendEmailUsecase {
  public static Name = 'SendEmailUsecase' as const;

  constructor() {}
  async execute(
    _input: SendEmailUsecase.Input,
  ): Promise<SendEmailUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace SendEmailUsecase {
  export type Input = {
    studentId: string;
    type: EmailTypes;
  };

  export type Output = void;
}
