import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { RegisterUsecase } from '@/application/usecases';
import { Course } from '@/domain';
import { z } from 'zod';
import { validateSecurePassword } from '../helper/password-validation-helper';
import { validateStudentRegistration } from '../helper/registration';

export class RegisterUsecaseZodValidator implements Validator<RegisterUsecase.Input> {
  private readonly schema = z.object({
    name: z.string(),
    registration: validateStudentRegistration(z.string().length(9)),
    course: z.nativeEnum(Course),
    password: validateSecurePassword(z.string()),
  }).strict();

  async validate(input: any): Promise<RegisterUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);

    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as RegisterUsecase.Input;
  }
}
