import { ChatRoom } from '@/domain';

export namespace ChatRoomRepository {
  export const Name = 'ChatRoomRepository';

  export namespace Create {
    export type Input = ChatRoom;

    export type Output = ChatRoom;
  };

  export namespace GetMessages{
    export type Input = { chatRoomId: string, };

    export type Output = Pick<ChatRoom, 'messages'> | null;
  }

  export namespace Update{
    export type Input = Partial<ChatRoom>;

    export type Output = ChatRoom;
  }

}

export interface ChatRoomRepository {
  create: (params: ChatRoomRepository.Create.Input) => Promise<ChatRoomRepository.Create.Output>;
  getMessages: (params: ChatRoomRepository.GetMessages.Input) => Promise<ChatRoomRepository.GetMessages.Output>;
  update: (id: string, params: ChatRoomRepository.Update.Input) => Promise<ChatRoomRepository.Update.Output>;
};
