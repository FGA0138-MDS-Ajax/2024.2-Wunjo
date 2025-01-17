import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { CreateQuestionUsecase } from '@/application/usecases';
import { QuestionDifficulty, QuestionUrgency } from '@/domain';
import { z } from 'zod';

export class ForumCreateQuestionUsecaseZodValidator implements Validator<CreateQuestionUsecase.Input> {
  private readonly schema = z
    .object({
      subjectId: z.string(),
      title: z.string(),
      description: z.string(),
      points: z.number().int(),
      difficulty: z.nativeEnum(QuestionDifficulty),
      urgency: z.nativeEnum(QuestionUrgency),
    });

  async validate(input: any): Promise<CreateQuestionUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!(validateResult).success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as CreateQuestionUsecase.Input;
  }
}
