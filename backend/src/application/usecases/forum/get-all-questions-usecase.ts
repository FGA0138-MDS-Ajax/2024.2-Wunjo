import { Question } from '@/domain';

export class GetAllQuestionsUsecase {
  public static Name = 'GetAllQuestionsUsecase' as const;

  constructor() {}
  async execute(): Promise<GetAllQuestionsUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace GetAllQuestionsUsecase {

  export type Output = {
    question: Question;
  };
}
