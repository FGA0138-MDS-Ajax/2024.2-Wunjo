import { MessageRepository } from '@/application/repositories';
import { PrismaClient } from '@prisma/client';

export class MessagePrismaRepository implements MessageRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    params: MessageRepository.Create.Input,
  ): Promise<MessageRepository.Create.Output> {
    const message = await this.prisma.chatMessages.create({
      data: {
        id: params.id,
        message: params.message,
        chatId: params.chatId,
        senderId: params.senderId,
      },
    });

    return message;
  }

  async delete(
    params: MessageRepository.Delete.Input,
  ): Promise<MessageRepository.Delete.Output> {
    const deleted = await this.prisma.chatMessages.delete({
      where: {
        id: params.id,
      },
    });

    return !!deleted;
  }
}
