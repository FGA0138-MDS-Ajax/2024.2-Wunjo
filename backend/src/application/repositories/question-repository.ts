import { Question } from '@/domain';

export namespace QuestionRepository {
  export const name = 'QuestionRepository';

  export namespace Create {
    export type Input = Question;

    export type Output = Question;
  };

  export namespace Update {
    export type Input = Partial<Question>;

    export type Output = Question | null;
  };

  export namespace FindBy {
    export type Input = Partial<{
      id: string;
      studentId: string;
      subjectId: string;
      tutorId: string;
    }>;

    export type Output = Question;
  };
};

export interface QuestionRepository {
  create: (params: QuestionRepository.Create.Input) => Promise<QuestionRepository.Create.Output>;
  update: (id: string, params: QuestionRepository.Update.Input) => Promise<QuestionRepository.Update.Output>;
  findBy: (params: QuestionRepository.FindBy.Input) => Promise<QuestionRepository.FindBy.Output>;
};
