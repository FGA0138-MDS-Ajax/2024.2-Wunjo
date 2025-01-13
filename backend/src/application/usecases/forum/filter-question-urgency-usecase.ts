import { Question, QuestionUrgencies } from '@/domain';

export class FilterQuestionByUrgencyUsecase {
  public static Name = 'FilterQuestionByUrgencyUsecase' as const;

  constructor() {}

  async execute(_input: QuestionUrgencies): Promise<FilterQuestionByUrgencyUsecase.Output> {
    throw new Error('Not Implemented yet.');
  }
}

export namespace FilterQuestionByUrgencyUsecase {
  export type Input = {
    urgency: QuestionUrgencies;
  };

  export type Output = {
    question: Question;
  };
}
