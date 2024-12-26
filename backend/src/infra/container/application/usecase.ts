import { RegisterUsecase, SendEmailUsecase } from '@/application/usecases';
import { InfraDI } from '../infra';

export function configureApplicationUsecaseDI(container: InfraDI) {
  return container
    .add(SendEmailUsecase.Name, () => new SendEmailUsecase())
    .add(RegisterUsecase.Name, () => new RegisterUsecase());
}

export type ApplicationUsecaseDI = ReturnType<
  typeof configureApplicationUsecaseDI
>;
