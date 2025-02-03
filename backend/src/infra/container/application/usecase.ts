import {
  AuthUsecase,
  ChangePasswordUsecase,
  ConfirmForgotPasswordCodeUsecase,
  CreateQuestionUsecase,
  DeleteQuestionUsecase,
  GetAllChatUsecase,
  GetAllQuestionsUsecase,
  GetAllSubjectsUsecase,
  GetChatUsecase,
  GetQuestionUsecase,
  LoginUsecase,
  RegisterConfirmUsecase,
  RegisterUsecase,
  ReplyQuestionUsecase,
  RequestForgotPasswordCodeUsecase,
  SendEmailUsecase,
  SendMessageUsecase,
} from '@/application/usecases';
import {
  ChangePasswordUsecaseZodValidator,
  ConfirmForgotPasswordCodeUsecaseZodValidator,
  ForumCreateQuestionUsecaseZodValidator,
  ForumDeleteQuestionUsecaseZodValidator,
  ForumGetAllChatUsecaseZodValidator,
  ForumGetAllQuestionsUsecaseZodValidator,
  ForumGetChatUsecaseZodValidator,
  ForumGetQuestionUsecaseZodValidator,
  ForumReplyQuestionUsecaseZodValidator,
  ForumSendMessageUsecaseZodValidator,
  LoginUsecaseZodValidator,
  RegisterUsecaseZodValidator,
  RequestForgotPasswordCodeUsecaseZodValidator,
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
      ({ QuestionRepository }) =>
        new CreateQuestionUsecase(
          QuestionRepository,
          new ForumCreateQuestionUsecaseZodValidator(),
        ),
    )
    .add(
      DeleteQuestionUsecase.Name,
      ({ QuestionRepository }) =>
        new DeleteQuestionUsecase(
          new ForumDeleteQuestionUsecaseZodValidator(),
          QuestionRepository,
        ),
    )
    .add(
      GetQuestionUsecase.Name,
      ({ QuestionRepository }) =>
        new GetQuestionUsecase(
          QuestionRepository,
          new ForumGetQuestionUsecaseZodValidator(),
        ),
    )
    .add(
      GetAllQuestionsUsecase.Name,
      ({ QuestionRepository }) =>
        new GetAllQuestionsUsecase(
          QuestionRepository,
          new ForumGetAllQuestionsUsecaseZodValidator(),
        ),
    )
    .add(GetAllSubjectsUsecase.Name, () => new GetAllSubjectsUsecase())
    .add(
      RequestForgotPasswordCodeUsecase.Name,
      ({ StudentRepository, DispatchEmailService, EmailRepository }) =>
        new RequestForgotPasswordCodeUsecase(
          new RequestForgotPasswordCodeUsecaseZodValidator(),
          StudentRepository,
          DispatchEmailService,
          EmailRepository,
        ),
    )
    .add(
      ConfirmForgotPasswordCodeUsecase.Name,
      ({ StudentRepository, EmailRepository, PasswordRecoveryRepository }) =>
        new ConfirmForgotPasswordCodeUsecase(
          new ConfirmForgotPasswordCodeUsecaseZodValidator(),
          StudentRepository,
          EmailRepository,
          PasswordRecoveryRepository,
        ),
    )
    .add(
      ChangePasswordUsecase.Name,
      ({ StudentRepository, PasswordHash, PasswordRecoveryRepository }) =>
        new ChangePasswordUsecase(
          new ChangePasswordUsecaseZodValidator(),
          StudentRepository,
          PasswordHash,
          PasswordRecoveryRepository,
        ),
    )
    .add(
      ReplyQuestionUsecase.Name,
      ({ StudentRepository, QuestionRepository, ChatRoomRepository }) =>
        new ReplyQuestionUsecase(
          new ForumReplyQuestionUsecaseZodValidator(),
          QuestionRepository,
          StudentRepository,
          ChatRoomRepository,
        ),
    )
    .add(
      GetAllChatUsecase.Name,
      ({ ChatRoomRepository }) =>
        new GetAllChatUsecase(
          new ForumGetAllChatUsecaseZodValidator(),
          ChatRoomRepository,
        ),
    )
    .add(
      GetChatUsecase.Name,
      ({ ChatRoomRepository }) =>
        new GetChatUsecase(
          new ForumGetChatUsecaseZodValidator(),
          ChatRoomRepository,
        ),
    )
    .add(
      SendMessageUsecase.Name,
      ({ ChatRoomRepository, MessageRepository }) =>
        new SendMessageUsecase(
          new ForumSendMessageUsecaseZodValidator(),
          ChatRoomRepository,
          MessageRepository,
        ),
    );
}

export type ApplicationUsecaseDI = ReturnType<
  typeof configureApplicationUsecaseDI
>;
