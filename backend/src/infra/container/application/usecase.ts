import {
  AuthUsecase,
  CreateQuestionUsecase,
  LoginUsecase,
  RegisterConfirmUsecase,
  RegisterUsecase,
  SendEmailUsecase,
} from '@/application/usecases';
import {
  ForumCreateQuestionUsecaseZodValidator,
  LoginUsecaseZodValidator,
  RegisterUsecaseZodValidator,
} from '@/infra/services/shared/zod';
import { InfraDI } from '../infra';

export function configureApplicationUsecaseDI(container: InfraDI) {
  return container
    .add(
      SendEmailUsecase.Name,
      ({
        StudentRepository,
        ProviderEmailServiceFacade,
        EmailTemplateRepository,
      }) =>
        new SendEmailUsecase(
          StudentRepository,
          ProviderEmailServiceFacade,
          EmailTemplateRepository,
        ),
    )
    .add(
      LoginUsecase.Name,
      ({ StudentRepository, PasswordHash, StudentTokenManager }) =>
        new LoginUsecase(
          new LoginUsecaseZodValidator(),
          StudentRepository,
          PasswordHash,
          StudentTokenManager,
        ),
    )
    .add(
      RegisterUsecase.Name,
      ({
        StudentRepository,
        PasswordHash,
        DispatchEmailService,
        EmailRepository,
      }) =>
        new RegisterUsecase(
          new RegisterUsecaseZodValidator(),
          StudentRepository,
          PasswordHash,
          DispatchEmailService,
          EmailRepository,
        ),
    )
    .add(
      RegisterConfirmUsecase.Name,
      ({ StudentRepository, EmailRepository }) =>
        new RegisterConfirmUsecase(StudentRepository, EmailRepository),
    )
    .add(
      AuthUsecase.Name,
      ({ StudentTokenManager, StudentRepository }) =>
        new AuthUsecase(StudentTokenManager, StudentRepository),
    )
    .add(
      CreateQuestionUsecase.Name,
      ({ QuestionRepository }) => new CreateQuestionUsecase(QuestionRepository, new ForumCreateQuestionUsecaseZodValidator()),
    );
}

export type ApplicationUsecaseDI = ReturnType<
  typeof configureApplicationUsecaseDI
>;
