import { ValidationError } from '@/application/error';
import { Validator } from '@/application/services';
import { LoginUsecase } from '@/application/usecases/auth/login-usecase';
import { z } from 'zod';
import { validateStudentRegistration } from '../helper/registration';

export class LoginUsecaseZodValidator implements Validator<LoginUsecase.Input> {
  private readonly schema = z.object({
    registration: validateStudentRegistration(z.string().length(9)),
    password: z.string().min(8).max(255),
  });

  async validate(input: any): Promise<LoginUsecase.Input> {
    const validateResult = await this.schema.safeParseAsync(input);
    if (!validateResult.success) {
      throw new ValidationError(validateResult.error.issues);
    }

    return validateResult.data as LoginUsecase.Input;
  }
}
