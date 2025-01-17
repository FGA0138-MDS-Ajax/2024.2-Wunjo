import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { DeleteQuestionUsecase } from '@/application/usecases';
import { z } from 'zod';

export class ForumDeleteQuestionUsecaseZodValitador implements Validator<DeleteQuestionUsecase.Input> {
  private readonly schema = z
    .object({
      questionId: z.string().uuid(),
    });

  async validate(input: any): Promise<DeleteQuestionUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!(validateResult).success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as DeleteQuestionUsecase.Input;
  }
}
