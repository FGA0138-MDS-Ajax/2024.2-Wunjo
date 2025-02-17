import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { CloseChatUsecase } from '@/application/usecases';
import { z } from 'zod';

export class ForumCloseChatUsecaseZodValidator implements Validator<CloseChatUsecase.Input> {
  private readonly schema = z.object({
    requesterId: z.string().uuid(),
    chatRoomId: z.string().uuid(),
    hasBeenAnswered: z.boolean().optional(),
    avaliation: z.number().min(1).max(5).optional(),
  });

  async validate(input: any): Promise<CloseChatUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as CloseChatUsecase.Input;
  }
}
