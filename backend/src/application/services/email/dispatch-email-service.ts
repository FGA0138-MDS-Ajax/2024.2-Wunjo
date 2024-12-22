import { EmailTypes } from '@/domain/Email';

export namespace DispatchEmailService {
  export type Input = {
    data: {
      studentId: string;
      type: EmailTypes;
    };
  };

  export type Output = void;
}

export interface DispatchEmailService {
  dispatch: (input: DispatchEmailService.Input) => DispatchEmailService.Output;
}
