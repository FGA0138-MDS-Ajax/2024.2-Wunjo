import { Season } from '@/domain/Season';

export namespace SeasonRepository {
  export const name = 'SeasonRepository';

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
};

export interface SeasonRepository {
  create: (params: SeasonRepository .Create.Input) => Promise<SeasonRepository.Create.Output>;
  update: (id: string, params: SeasonRepository.Update.Input) => Promise<SeasonRepository.Update.Output>;
  getById: (id: string) => Promise<SeasonRepository.GetById.Output>;
};
