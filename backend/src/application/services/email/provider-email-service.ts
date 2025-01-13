export namespace ProviderEmailService {
  export type Input = {
    from: string;
    to: string;
    subject: string;
    html: string;
  };
}

export interface ProviderEmailService {
  send: (input: ProviderEmailService.Input) => Promise<void>;
}
