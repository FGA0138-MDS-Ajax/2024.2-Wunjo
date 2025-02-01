import { Message } from '@/domain';

export namespace MessageRepository {
  export const Name = 'MessageRepository';

  export namespace Create {
    export type Input = Message;

    export type Output = Message;
  }

  export namespace Delete {
    export type Input = {
      id: string;
    };

    export type Output = boolean;
  }

}

export interface MessageRepository {
  create: (params: MessageRepository.Create.Input,) => Promise<MessageRepository.Create.Output>;
  delete: (params: MessageRepository.Delete.Input,) => Promise<MessageRepository.Delete.Output>;
}
