import { Question, QuestionDifficulties } from '@/domain';

export class FilterQuestionsByDifficultyUsecase {
  public static Name = ' FilterQuestionsByDifficultyUsecase' as const;

  constructor() {}
  async execute(): Promise< FilterQuestionsByDifficultyUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace FilterQuestionsByDifficultyUsecase {
  export type Input = {
    difficulty: QuestionDifficulties;
  };

  export type Output = {
    question: Question;
  };
}
