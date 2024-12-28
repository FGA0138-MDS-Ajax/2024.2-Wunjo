export namespace NotifyService {
  export type Input = {
    data: object;
  };
}

export interface NotifyService {
  notify: (input: NotifyService.Input) => Promise<void>;
}
