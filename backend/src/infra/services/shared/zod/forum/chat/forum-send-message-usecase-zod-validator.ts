import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { SendMessageUsecase } from '@/application/usecases';
import { z } from 'zod';

export class ForumSendMessageUsecaseZodValidator
  implements Validator<SendMessageUsecase.Input>
{
  private readonly schema = z.object({
    senderId: z.string().uuid(),
    chatId: z.string().uuid(),
    message: z.string(),
  });

  async validate(input: any): Promise<SendMessageUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as SendMessageUsecase.Input;
  }
}
