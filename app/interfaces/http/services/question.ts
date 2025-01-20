import { IQuestion, IStudent } from '@/interfaces/application';

export namespace IQuestionService {
  export namespace Fetch {
    export type Request = {};

    export type Response = {
      questions: Array<
        IQuestion & {
          student: IStudent;
        }
      >;
    };
  }

  export namespace Get {
    export type Request = {
      id: string;
    };

    export type Response = {
      question: IQuestion & {
        student: IStudent;
      };
    };
  }

  export namespace Create {
    export type Request = {
      subjectId: string;
      title: string;
      description: string;
      difficulty: string;
      urgency: string;
    };

    export type Response = {
      question: IQuestion;
    };
  }
}
