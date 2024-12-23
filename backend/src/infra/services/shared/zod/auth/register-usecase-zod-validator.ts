import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { RegisterUsecase } from '@/application/usecases';
import { Course } from '@/domain';
import { z } from 'zod';


export class RegisterUsecaseZodValidator implements Validator<RegisterUsecase.Input> {
  private readonly schema = z
    .object({
      name: z.string(),
      registration: z.string().length(9),
      course: z.nativeEnum(Course),
      password: z.string().min(8).max(255),
    })
    .refine((data) => {
      if (
        Number(data.registration[0]) > 2 || Number(data.registration[0]) < 1
      ) {
        return false;
      }

      return true;
    });

  async validate(input: any): Promise<RegisterUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as RegisterUsecase.Input;
  }
}
