import { NotFoundError } from '@/application/error';
import { ChatRoomRepository } from '@/application/repositories';
import { Validator } from '@/application/services';
import { ChatRoom, Message } from '@/domain';

export class GetChatUsecase {
  public static Name = 'GetChatUsecase' as const;

  constructor(
    private readonly validator: Validator<GetChatUsecase.Input>,
    private readonly chatRoomRepository: ChatRoomRepository,
  ) {}

  async execute(input: GetChatUsecase.Input): Promise<GetChatUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const chatRoom = await this.chatRoomRepository.getMessages({
      chatRoomId: validatedInput.chatId,
    });

    if (!chatRoom || !(chatRoom.studentId === validatedInput.studentId || chatRoom.tutorId === validatedInput.studentId)) {
      throw new NotFoundError('Chat não encontrado', 'CHAT');
    }

    return chatRoom;
  }
}

export namespace GetChatUsecase {
  export type Input = {
    studentId: string;
    chatId: string;
  };

  export type Output = ChatRoom & {
    messages: Message[];
  };
}
