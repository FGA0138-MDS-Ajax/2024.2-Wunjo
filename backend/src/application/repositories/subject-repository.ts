import { Subject } from '@/domain';

export namespace SubjectRepository {
  export const name = 'SubjectRepository';

  export namespace Create {
    export type Input = Subject;

    export type Output = Subject;
  };

  export namespace Update {
    export type Input = Partial<Subject>;

    export type Output = Subject | null;
  };

  export namespace FindBy {
    export type Input = Partial<{
      id: string;
      code: string;
    }>;

    export type Output = Subject;
  };
};

export interface SubjectRepository {
  create: (params: SubjectRepository.Create.Input) => Promise<SubjectRepository.Create.Output>;
  update: (id: string, params: SubjectRepository.Update.Input) => Promise<SubjectRepository.Update.Output>;
  findBy: (params: SubjectRepository.FindBy.Input) => Promise<SubjectRepository.FindBy.Output>;
};
