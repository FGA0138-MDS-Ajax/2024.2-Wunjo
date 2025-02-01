import {
  Question,
  QuestionDifficulties,
  QuestionUrgencies,
  Student,
} from '@/domain';

export namespace QuestionRepository {
  export const Name = 'QuestionRepository';

  export namespace Create {
    export type Input = Question;

    export type Output = Question;
  }
  export namespace Update {
    export type Input = Partial<Question>;

    export type Output = Question | null;
  }

  export namespace FindBy {
    export type Input = Partial<{
      id: string;
      studentId: string;
      subjectId: string;
      tutorId: string;
      urgency: QuestionUrgencies;
      difficulty: QuestionDifficulties;
      include: Partial<{
        student: boolean;
      }>;
    }>;

    export type Output = Question & {
      student?: Student;
    } | null;
  }

  export namespace FindAll {
    export type Input = Partial<{
      urgency: QuestionUrgencies;
      difficulty: QuestionDifficulties;
      include: Partial<{
        student: boolean;
      }>;
    }>;

    export type Output = Array<
      Question & {
        student?: Student;
      }
    >;
  }

  export namespace Delete {
    export type Input = {
      id: string;
    };

    export type Output = boolean;
  }
}

export interface QuestionRepository {
  create: (
    params: QuestionRepository.Create.Input,
  ) => Promise<QuestionRepository.Create.Output>;
  update: (
    id: string,
    params: QuestionRepository.Update.Input,
  ) => Promise<QuestionRepository.Update.Output>;
  findBy: (
    params: QuestionRepository.FindBy.Input,
  ) => Promise<QuestionRepository.FindBy.Output>;
  findAll: (
    params: QuestionRepository.FindAll.Input,
  ) => Promise<QuestionRepository.FindAll.Output>;
  delete: (
    params: QuestionRepository.Delete.Input,
  ) => Promise<QuestionRepository.Delete.Output>;
}
