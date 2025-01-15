import { Question, QuestionDifficulties, QuestionUrgencies } from '@/domain';

export class CreateQuestionUsecase {
  public static Name = 'CreateQuestionUsecase' as const;

  constructor() {}

  async execute(_input: CreateQuestionUsecase.Input): Promise<CreateQuestionUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace CreateQuestionUsecase {
  export type Input = {
    subjectId: string;
    title: string;
    description: string;
    points: number;
    difficulty: QuestionDifficulties;
    urgency: QuestionUrgencies;
  };

  export type Output = {
    question: Question;
  };
}
