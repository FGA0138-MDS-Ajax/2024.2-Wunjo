import { Student } from '@/domain';
import { SeasonStudent } from '@/domain/SeasonStudent';

export namespace StudentSeasonRepository {
  export const Name = 'StudentSeasonRepository';

  export namespace GetAll {
    export type Input = Partial<{
      where: {
        seasonId: string;
      };
      orderBy: {
        [key: string]: 'asc' | 'desc';
      };
    }>;

    export type Output = Array<SeasonStudent & { student: Student, }>;
  }

  export namespace Update {
    export type Input = Partial<Omit<SeasonStudent, 'id'>>;

    export type Output = SeasonStudent | null;
  }

  export namespace UpdateBy {
    export type Where = Partial<{
      studentId: string;
      seasonId: string;
    }>;

    export type Input = Partial<Omit<SeasonStudent, 'id'>>;

    export type Output = SeasonStudent | null;
  }

  export namespace GetBy {
    export type Input = Partial<{
      studentId: string;
      seasonId: string;
    }>;

    export type Output = SeasonStudent | null;
  }
}

export interface StudentSeasonRepository {
  update: (
    id: string,
    params: StudentSeasonRepository.Update.Input,
  ) => Promise<StudentSeasonRepository.Update.Output>;
  updateBy: (
    where: StudentSeasonRepository.UpdateBy.Where,
    params: StudentSeasonRepository.UpdateBy.Input,
  ) => Promise<StudentSeasonRepository.UpdateBy.Output>;
  getBy: (
    params: StudentSeasonRepository.GetBy.Input,
  ) => Promise<StudentSeasonRepository.GetBy.Output>;
  getAll: (
    params: StudentSeasonRepository.GetAll.Input,
  ) => Promise<StudentSeasonRepository.GetAll.Output>;
}
