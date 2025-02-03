import { randomUUID } from 'node:crypto';
import { NotAvailableError, NotFoundError } from '@/application/error';
import {
  ChatRoomRepository,
  MessageRepository,
} from '@/application/repositories';
import { Validator } from '@/application/services';
import { Message } from '@/domain';

export class SendMessageUsecase {
  public static Name = 'SendMessageUsecase' as const;

  constructor(
    private readonly validator: Validator<SendMessageUsecase.Input>,
    private readonly chatRoomRepository: ChatRoomRepository,
    private readonly messageRepository: MessageRepository,
  ) {}

  async execute(
    input: SendMessageUsecase.Input,
  ): Promise<SendMessageUsecase.Output> {
    const validatedInput = await this.validator.validate(input);

    const chat = await this.chatRoomRepository.findBy({
      id: validatedInput.chatId,
    });

    if (!chat) {
      throw new NotFoundError('Chat não encontrado', 'CHAT');
    }

    if (
      !(
        validatedInput.senderId === chat.studentId ||
        validatedInput.senderId === chat.tutorId
      )
    ) {
      throw new NotAvailableError(
        'Você não pode enviar mensagens para esse chat',
      );
    }

    const message = await this.messageRepository.create({
      id: randomUUID(),
      chatId: chat.id,
      senderId: validatedInput.senderId,
      message: validatedInput.message,
    });

    return { message };
  }
}

export namespace SendMessageUsecase {
  export type Input = {
    chatId: string;
    senderId: string;
    message: string;
  };

  export type Output = {
    message: Message;
  };
}
