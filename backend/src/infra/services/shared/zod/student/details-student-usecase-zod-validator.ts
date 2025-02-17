import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { DetailsStudentUsecase } from '@/application/usecases';
import { z } from 'zod';

export class DetailsStudentUsecaseZodValidator implements Validator<DetailsStudentUsecase.Input> {
  private readonly schema = z.object({
    studentId: z.string().uuid(),
  });

  async validate(input: any): Promise<DetailsStudentUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as DetailsStudentUsecase.Input;
  }
}
