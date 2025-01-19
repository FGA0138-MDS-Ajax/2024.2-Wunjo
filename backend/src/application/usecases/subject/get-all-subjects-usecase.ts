import { Subject } from '@/domain';
import Subjects from '../../../../public/subjects_formated.json';

export class GetAllSubjectsUsecase {
  constructor() {}

  async execute(
    params: GetAllSubjectsUsecase.Input,
  ): Promise<GetAllSubjectsUsecase.Output> {
    let subjects = Subjects.flat();

    if (params.search) {
      const allowedSearchFields = ['name', 'code'];

      subjects = subjects.filter((subject) => {
        return allowedSearchFields.some((field) => {
          return String(subject[field as keyof typeof subject])
            .toLowerCase()
            .includes(params.search!.toLowerCase());
        });
      });
    }

    if (params.sort) {
      if (params.sort.name === 'asc') {
        subjects.sort((a, b) => a.name.localeCompare(b.name));
      } else if (params.sort.name === 'desc') {
        subjects.sort((a, b) => b.name.localeCompare(a.name));
      }
    }

    return {
      subjects,
    };
  }
}

export namespace GetAllSubjectsUsecase {
  export const Name = 'GetAllSubjectsUsecase';

  export type Input = {
    sort: Partial<{
      name: 'asc' | 'desc';
    }>;
    search?: string;
  };

  export type Output = {
    subjects: Subject[];
  };
}
