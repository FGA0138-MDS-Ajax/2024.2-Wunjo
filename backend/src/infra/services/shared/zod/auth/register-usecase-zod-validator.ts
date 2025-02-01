import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { RegisterUsecase } from '@/application/usecases';
import { Course } from '@/domain';
import { z } from 'zod';
import { validateStudentRegistration } from '../helper/registration';

export class RegisterUsecaseZodValidator implements Validator<RegisterUsecase.Input> {
  private readonly schema = z.object({
    name: z.string(),
    registration: validateStudentRegistration(z.string().length(9)),
    course: z.nativeEnum(Course),
    password: z.string().min(8).max(255),
  });

  async validate(input: any): Promise<RegisterUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as RegisterUsecase.Input;
  }
}
