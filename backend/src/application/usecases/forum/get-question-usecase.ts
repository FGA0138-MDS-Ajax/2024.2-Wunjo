import { NotFoundError } from '@/application/error';
import { QuestionRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { Question } from '@/domain';
import { ForumGetQuestionUsecaseZodValidator } from '@/infra/services/shared/zod';

export class GetQuestionUsecase {
  public static Name = 'GetQuestionUsecase' as const;

  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly validator: Validator<GetQuestionUsecase.Input>,
  ) {}

  async execute(input: GetQuestionUsecase.Input): Promise<GetQuestionUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const question = await this.questionRepository.findBy({ id: validatedInput.questionId });
    if (!question) {
      throw new NotFoundError('Question not found', 'QUESTION');
    }

    return { question };
  }
}

export namespace GetQuestionUsecase {
  export type Input = {
    questionId: string;
  };

  export type Output = {
    question: Question | null;
  };
}
