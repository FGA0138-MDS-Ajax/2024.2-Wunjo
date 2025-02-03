import { randomUUID } from 'node:crypto';
import { NotAvailableError, NotFoundError } from '@/application/error';
import {
  ChatRoomRepository,
  QuestionRepository,
  StudentRepository,
} from '@/application/repositories';
import { Validator } from '@/application/services';
import { ChatRoomStatuses, Question, QuestionStatus } from '@/domain';
// import { Socket } from '@/messsaging/socket';

export class ReplyQuestionUsecase {
  public static Name = 'ReplyQuestionUsecase' as const;

  constructor(
    private readonly validator: Validator<ReplyQuestionUsecase.Input>,
    private readonly questionRepository: QuestionRepository,
    private readonly studentRepository: StudentRepository,
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(
    input: ReplyQuestionUsecase.Input,
  ): Promise<ReplyQuestionUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const question = await this.questionRepository.findBy({
      id: validatedInput.questionId,
    });

    if (!question) {
      throw new NotFoundError('Questão não encontrada', 'QUESTION');
    }

    const tutor = await this.studentRepository.findBy({
      where: {
        id: validatedInput.tutorId,
      },
    });

    if (!tutor) {
      throw new NotFoundError('Aluno não encontrado', 'STUDENT');
    }

    if (question.studentId === tutor.id) {
      throw new NotAvailableError(
        'Você não pode responder a sua própria pergunta',
      );
    }

    if (question.status !== QuestionStatus.OPEN) {
      throw new NotAvailableError('Essa pergunta não está mais disponível');
    }

    if (question.tutors.some((t) => t.id === tutor.id)) {
      throw new NotAvailableError('Você já respondeu a essa pergunta');
    }

    const chatRoom = await this.chatRoomRepository.create({
      id: randomUUID(),
      studentId: question.studentId,
      tutorId: tutor.id,
      questionId: question.id,
      status: ChatRoomStatuses.OPEN,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await this.questionRepository.update(question.id, {
      status: QuestionStatus.IN_PROGRESS,
      tutorId: tutor.id,
      tutors: [
        ...question.tutors,
        {
          id: tutor.id,
          avaliation: -1,
          chatRoomId: chatRoom.id,
        },
      ],
    });

    // Socket.notifyStudentOnConversationCreate(
    //   [question.studentId, question.tutorId],
    //   {
    //     chatRoomId: chatRoom.id,
    //   },
    // );

    return {
      chatRoomId: chatRoom.id,
      question,
    };
  }
}

export namespace ReplyQuestionUsecase {
  export type Input = {
    questionId: string;
    tutorId: string;
  };

  export type Output = {
    chatRoomId: string;
    question: Question;
  };
}
