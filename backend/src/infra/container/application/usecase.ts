import {
  LoginUsecase,
  RegisterUsecase,
  SendEmailUsecase,
} from '@/application/usecases';

import { RegisterUsecaseZodValidator } from '@/infra/services/shared/zod';
import { LoginUsecaseZodValidator } from '@/infra/services/shared/zod/auth/login-usecase-zod-validator';
import { JWTStudentTokenManager } from '@/infra/services/token/jwt-token-manager';
import { InfraDI } from '../infra';

export function configureApplicationUsecaseDI(container: InfraDI) {
  return container
    .add(SendEmailUsecase.Name, () => new SendEmailUsecase())
    .add(LoginUsecase.Name, ({ StudentRepository, PasswordHash }) => new LoginUsecase(
      StudentRepository,
      new JWTStudentTokenManager(),
      new LoginUsecaseZodValidator(),
      PasswordHash,
    ))
    .add(
      RegisterUsecase.Name,
      ({ StudentRepository, PasswordHash, DispatchEmailService }) =>
        new RegisterUsecase(
          new RegisterUsecaseZodValidator(),
          StudentRepository,
          PasswordHash,
          DispatchEmailService,
        ),
    );
}

export type ApplicationUsecaseDI = ReturnType<
  typeof configureApplicationUsecaseDI
>;
