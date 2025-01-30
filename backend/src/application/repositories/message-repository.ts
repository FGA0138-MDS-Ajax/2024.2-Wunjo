export namespace MessageRepository {
  export const Name = 'MessageRepository';

  export namespace Create {
    export type Input = Message;

    export type Output = Message;
  }

  export namespace Delete {
    export type Input = {
      id: string;
      message: Message;
    };

    export type Output = Message;
  }

  export namespace FindAllBy {
    export type Input = Partial<{
      quesitonId: string;
      authorId: string;
      chatRoomId: string;
    }>;

    export type Output = Array<Message>;
  }
}

export interface MessageRepository {
  create: (params: MessageRepository.Create.Input,) => Promise<MessageRepository.Create.Output>;
  delete: (params: MessageRepository.Delete.Input,) => Promise<MessageRepository.Delete.Output>;
  findAllBy: (params: MessageRepository.FindAllBy.Input,) => Promise<MessageRepository.FindAllBy.Output>;
}
