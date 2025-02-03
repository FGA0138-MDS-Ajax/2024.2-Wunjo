import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { GetChatUsecase } from '@/application/usecases';
import { z } from 'zod';

export class ForumGetChatUsecaseZodValidator implements Validator<GetChatUsecase.Input> {
  private readonly schema = z.object({
    studentId: z.string().uuid(),
    chatId: z.string().uuid(),
  });

  async validate(input: any): Promise<GetChatUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as GetChatUsecase.Input;
  }
}
