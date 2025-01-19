import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { GetQuestionUsecase } from '@/application/usecases';
import { z } from 'zod';

export class ForumGetQuestionUsecaseZodValidator implements Validator<GetQuestionUsecase.Input> {
  private readonly schema = z
    .object({
      questionId: z.string().uuid(),
    });

  async validate(input: any): Promise<GetQuestionUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!(validateResult).success) {
      throw new ValidationError(validateResult.error.issues);
    }
    return validateResult.data as GetQuestionUsecase.Input;
  }
}
