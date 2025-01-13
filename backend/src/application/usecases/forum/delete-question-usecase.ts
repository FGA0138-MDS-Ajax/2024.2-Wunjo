export class DeleteQuestionUsecase {
  public static Name = 'DeleteQuestionUsecase' as const;

  constructor() {}
  async execute(_input: DeleteQuestionUsecase.Input): Promise<DeleteQuestionUsecase.Output> {
    throw new Error('Not implemented.');
  }
}

export namespace DeleteQuestionUsecase {
  export type Input = {
    questionId: string;
  };

  export type Output = {
    question: boolean;
  };
}
