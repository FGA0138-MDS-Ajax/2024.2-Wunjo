import { Question } from '@/domain';

export class GetQuestionUsecase {
  public static Name = 'GetQuestionUsecase' as const;

  constructor() {}
  async execute(_input: GetQuestionUsecase.Input): Promise<GetQuestionUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace GetQuestionUsecase {
  export type Input = {
    questionId: string;
  };

  export type Output = {
    question: Question;
  };
}
