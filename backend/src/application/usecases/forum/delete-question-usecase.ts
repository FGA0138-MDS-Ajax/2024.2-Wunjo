import { AlreadyExistsError } from '@/application/error';
import { QuestionRepository } from '@/application/repositories';
import { Validator } from '@/application/services';

export class DeleteQuestionUsecase {
  public static Name = 'DeleteQuestionUsecase' as const;

  constructor(
    private readonly validator: Validator<DeleteQuestionUsecase.Input>,
    private readonly questionRepository: QuestionRepository,
  ) {}

  async execute(input: DeleteQuestionUsecase.Input): Promise<DeleteQuestionUsecase.Output> {
    const validatedInput = await this.validator.validate(input);
    const questionExists = await this.questionRepository.findBy({ id: validatedInput.questionId });

    if (!questionExists) {
      throw new AlreadyExistsError('QUESTAO');
    };

    const response = await this.questionRepository.delete({ id: validatedInput.questionId });

    return { question: response };
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
