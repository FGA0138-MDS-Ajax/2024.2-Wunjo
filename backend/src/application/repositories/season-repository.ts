import { Season } from '@/domain';

export namespace SeasonRepository {
  export const Name = 'SeasonRepository';

  export namespace Create {
    export type Input = Season;

    export type Output = Season;
  };

  export namespace Update {
    export type Input = Partial<Season>;

    export type Output = Season | null;
  };

  export namespace GetById {
    export type Output = Season;
  };

  export namespace GetLatest {
    export type Output = Season | null;
  };
};

export interface SeasonRepository {
  create: (params: SeasonRepository .Create.Input) => Promise<SeasonRepository.Create.Output>;
  update: (id: string, params: SeasonRepository.Update.Input) => Promise<SeasonRepository.Update.Output>;
  getById: (id: string) => Promise<SeasonRepository.GetById.Output>;
  getLatest: () => Promise<SeasonRepository.GetLatest.Output>;
};
