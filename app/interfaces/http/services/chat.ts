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
            question: {
              id: string;
              title: string;
              description: string;
              points: number;
              status: string;
              difficulty: string;
              urgency: string;
              tutorId: string;
              studentId: string;
              subjectId: string;
              subject: {
                id: string;
                code: string;
                name: string;
                departmentCode: string;
              };
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

  export namespace Close {
    export type Request = {
      id: string;
      hasBeenAnswered?: boolean;
      avaliation?: number;
    };

    export type Response = {};
  }
}
