import { Question, QuestionDifficulties, QuestionUrgencies } from '@/domain';

export class GetAllQuestionsUsecase {
  public static Name = 'GetAllQuestionsUsecase' as const;

  constructor() {}
  async execute(_input: GetAllQuestionsUsecase.Input): Promise<GetAllQuestionsUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace GetAllQuestionsUsecase {
  export type Input = {
    filter: Partial<
      {
        urgency: QuestionUrgencies;
        difficulty: QuestionDifficulties;
      }
    >;
  };

  export type Output = {
    question: Question;
  };
}
