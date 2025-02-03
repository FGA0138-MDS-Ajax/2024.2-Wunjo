import { ChatRoom, Message, Student } from '@/domain';

export namespace ChatRoomRepository {
  export const Name = 'ChatRoomRepository';

  export namespace Create {
    export type Input = ChatRoom;

    export type Output = ChatRoom;
  }

  export namespace GetAll {
    export type Input = { studentId: string, };

    export type Output = Array<
      ChatRoom & {
        student: Pick<
          Student,
          'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
        tutor: Pick<
          Student,
          'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
      }
    >;
  }

  export namespace FindBy {
    export type Input = { id: string, };

    export type Output =
      | (ChatRoom & {
        student: Pick<
          Student,
            'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
        tutor: Pick<
          Student,
            'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
      })
      | null;
  }
  export namespace GetMessages {
    export type Input = { chatRoomId: string, };

    export type Output =
      | (ChatRoom & {
        student: Pick<
          Student,
            'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
        tutor: Pick<
          Student,
            'id' | 'avatar' | 'avatarUrl' | 'name' | 'registration' | 'email'
        >;
        messages: Message[];
      })
      | null;
  }

  export namespace Update {
    export type Input = Partial<Omit<ChatRoom, 'id'>>;

    export type Output = ChatRoom;
  }
}

export interface ChatRoomRepository {
  create: (
    params: ChatRoomRepository.Create.Input,
  ) => Promise<ChatRoomRepository.Create.Output>;
  getAll: (
    params: ChatRoomRepository.GetAll.Input,
  ) => Promise<ChatRoomRepository.GetAll.Output>;
  getMessages: (
    params: ChatRoomRepository.GetMessages.Input,
  ) => Promise<ChatRoomRepository.GetMessages.Output>;
  findBy: (
    params: ChatRoomRepository.FindBy.Input,
  ) => Promise<ChatRoomRepository.FindBy.Output>;
  update: (
    id: string,
    params: ChatRoomRepository.Update.Input,
  ) => Promise<ChatRoomRepository.Update.Output>;
}
