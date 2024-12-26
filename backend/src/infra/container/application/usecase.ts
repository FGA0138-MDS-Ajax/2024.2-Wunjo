import { LoginUsecase, RegisterUsecase, SendEmailUsecase } from '@/application/usecases';
import { InfraDI } from '../infra';

export function configureApplicationUsecaseDI(container: InfraDI) {
  return container
    .add(SendEmailUsecase.Name, () => new SendEmailUsecase())
    .add(LoginUsecase.Name, () => new LoginUsecase())
    .add(RegisterUsecase.Name, () => new RegisterUsecase());
}

export type ApplicationUsecaseDI = ReturnType<
  typeof configureApplicationUsecaseDI
>;
