import {
  NotFoundError,
  RegisterOptions,
  ValidationError,
} from '@/application/error';
import {
  ChatRoomRepository,
  QuestionRepository,
  SeasonRepository,
  StudentSeasonRepository,
} from '@/application/repositories';
import { Validator } from '@/application/services';
import {
  ChatRoomStatuses,
  PersonTypes,
  Question,
  QuestionStatus,
} from '@/domain';

export class CloseChatUsecase {
  public static Name = 'CloseChatUsecase' as const;

  constructor(
    private readonly validator: Validator<CloseChatUsecase.Input>,
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly questionRepository: QuestionRepository,
    private readonly seasonRepository: SeasonRepository,
    private readonly seasonStudentRepository: StudentSeasonRepository,
  ) {}

  async execute(
    input: CloseChatUsecase.Input,
  ): Promise<CloseChatUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const chatRoom = await this.chatRoomRepository.findBy({
      id: validatedInput.chatRoomId,
    });

    if (!chatRoom) {
      throw new NotFoundError('Chat não encontrado', RegisterOptions.CHAT);
    }
    const question = await this.questionRepository.findBy({
      id: chatRoom.questionId,
    });

    if (!question) {
      throw new NotFoundError(
        'Questão não encontrada',
        RegisterOptions.QUESTION,
      );
    }

    const me = chatRoom.studentId === validatedInput.requesterId ? PersonTypes.STUDENT : PersonTypes.TUTOR;

    me === PersonTypes.STUDENT
      ? await this.studentCloseChat(chatRoom, question, validatedInput)
      : await this.tutorCloseChat(chatRoom, question);
  }

  private async studentCloseChat(
    chatRoom: ChatRoomRepository.FindBy.Output,
    question: Question,
    input: CloseChatUsecase.Input,
  ) {
    if (!chatRoom || !input) {
      return;
    }

    if (!input.hasBeenAnswered || !input.avaliation) {
      throw new ValidationError(
        [
          {
            path: ['hasBeenAnswered', 'avaliation'],
            message: 'hasBeenAnswered e avaliation são obrigatórios',
          },
        ],
        true,
      );
    }

    const tutors = question.tutors.map((tutor) => {
      if (tutor.id === chatRoom.tutorId) {
        tutor.avaliation = input.avaliation!;
      }

      return tutor;
    });

    const updatedQuestion = {
      ...question,
      status: input.hasBeenAnswered!
        ? QuestionStatus.FINISHED
        : QuestionStatus.OPEN,
      ...(!input.hasBeenAnswered ? { tutorId: null } : {}),
      tutors,
    } as Question;

    await this.questionRepository.update(question.id, updatedQuestion);
    await this.chatRoomRepository.update(chatRoom.id, {
      status: ChatRoomStatuses.CLOSED,
    });
    await this.updateSeasonPoints(chatRoom.tutorId, input.avaliation, question);
  }

  private async tutorCloseChat(
    chatRoom: ChatRoomRepository.FindBy.Output,
    question: Question,
  ) {
    if (!chatRoom) {
      return;
    }

    const updatedQuestion = {
      ...question,
      status: QuestionStatus.FINISHED,
    } as Question;

    await this.questionRepository.update(question.id, updatedQuestion);
    await this.chatRoomRepository.update(chatRoom.id, {
      status: ChatRoomStatuses.CLOSED,
    });
  }

  private async updateSeasonPoints(tutorId: string, avaliation: number, question: Question) {
    const season = await this.seasonRepository.getLatest();

    if (!season) {
      return;
    }

    const studentSeason = await this.seasonStudentRepository.getBy({
      seasonId: season.id,
      studentId: tutorId,
    });

    if (!studentSeason) {
      return;
    }

    studentSeason.points += (question.points * (avaliation * 20) / 100);

    await this.seasonStudentRepository.update(studentSeason.id, studentSeason);
  }
}

export namespace CloseChatUsecase {
  export type Input = {
    requesterId: string;
    chatRoomId: string;
    hasBeenAnswered?: boolean;
    avaliation?: number;
  };

  export type Output = void;
}
