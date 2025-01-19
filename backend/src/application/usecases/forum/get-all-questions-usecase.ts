import { QuestionRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { Question, QuestionDifficulties, QuestionUrgencies } from '@/domain';

export class GetAllQuestionsUsecase {
  public static Name = 'GetAllQuestionsUsecase' as const;

  constructor(
    private readonly questionRepository: QuestionRepository,
    private readonly validator: Validator<GetAllQuestionsUsecase.Input>,
  ) {}

  async execute(
    input: GetAllQuestionsUsecase.Input,
  ): Promise<GetAllQuestionsUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const questions = await this.questionRepository.findAll({
      urgency: validatedInput.filter.urgency,
      difficulty: validatedInput.filter.difficulty,
      include: {
        student: true,
      },
    });

    return { questions };
  }
}

export namespace GetAllQuestionsUsecase {
  export type Input = {
    filter: Partial<{
      urgency: QuestionUrgencies;
      difficulty: QuestionDifficulties;
    }>;
  };

  export type Output = {
    questions: Question[];
  };
}
