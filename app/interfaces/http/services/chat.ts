import { IChatRoom, IQuestion } from '@/interfaces/application';

export namespace IChatService {
  export namespace Fetch {
    export type Request = {};

    export type Response = {
      chats: Array<
        Omit<
          IChatRoom & {
            student: {
              id: string;
              name: string;
              email: string;
              avatar: string;
              avatarUrl: string;
              registration: string;
            };
            tutor: {
              id: string;
              name: string;
              email: string;
              avatar: string;
              avatarUrl: string;
              registration: string;
            };
          },
          'messages'
        >
      >;
    };
  }

  export namespace Get {
    export type Request = {};

    export type Response = IChatRoom & {
      student: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        avatarUrl: string;
        registration: string;
      };
      tutor: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        avatarUrl: string;
        registration: string;
      };
      question: IQuestion;
    };
  }
}
