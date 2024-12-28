import {
  LoginUsecase,
  RegisterUsecase,
  SendEmailUsecase,
} from '@/application/usecases';
import { RegisterUsecaseZodValidator } from '@/infra/services/shared/zod';
import { InfraDI } from '../infra';

export function configureApplicationUsecaseDI(container: InfraDI) {
  return container
    .add(SendEmailUsecase.Name, () => new SendEmailUsecase())
    .add(LoginUsecase.Name, () => new LoginUsecase())
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
