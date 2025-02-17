import Subjects from '@/../public/subjects_formated.json';
import { ChatRoomRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { ChatRoom, Question, Subject } from '@/domain';

export class GetAllChatUsecase {
  public static Name = 'GetAllChatUsecase' as const;

  constructor(
    private readonly validator: Validator<GetAllChatUsecase.Input>,
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(
    input: GetAllChatUsecase.Input,
  ): Promise<GetAllChatUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const chatRoom = await this.chatRoomRepository.getAll({
      studentId: validatedInput.studentId,
    });

    return {
      chats: chatRoom.map((chat) => ({
        ...chat,
        question: {
          ...chat.question,
          subject: Subjects.find(
            (subject) => subject.id === chat.question.subjectId,
          ) as Subject,
        },
      })),
    };
  }
}

export namespace GetAllChatUsecase {
  export type Input = {
    studentId: string;
  };

  export type Output = {
    chats: Array<
      ChatRoom & {
        question: Pick<
          Question,
          | 'id'
          | 'title'
          | 'description'
          | 'points'
          | 'status'
          | 'difficulty'
          | 'urgency'
          | 'tutorId'
          | 'studentId'
          | 'subjectId'
        > & {
          subject: Subject;
        };
      }
    >;
  };
}
