import type { Question, Student, StudentSeason } from '@/domain';

export namespace StudentRepository {
  export const Name = 'StudentRepository';

  export namespace Create {
    export type Input = Student & Partial<{
      questions: Array<Question>;
      seasons: Array<Omit<StudentSeason, 'studentId'>>;
    }>;

    export type Output = Omit<Student, 'questions' | 'seasons'>;
  }

  export namespace Update {
    export type Input = Partial<Student>;

    export type Output = Student | null;
  }

  export namespace FindBy {
    export type Input = {
      where: Partial<{
        id: string;
        registration: string;
        email: string;
      }>;
      relations?: Partial<{
        questions: boolean;
        seasons: boolean;
      }>;
    };

    export type Output = Student | null;
  }
}

export interface StudentRepository {
  create: (params: StudentRepository.Create.Input) => Promise<StudentRepository.Create.Output>;
  update: (id: string, params: StudentRepository.Update.Input) => Promise<StudentRepository.Update.Output>;
  findBy: (params: StudentRepository.FindBy.Input) => Promise<StudentRepository.FindBy.Output>;
};
