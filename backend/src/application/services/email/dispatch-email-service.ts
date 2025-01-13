import { EmailTypes } from '@/domain';

export namespace DispatchEmailService {
  export const Name = 'DispatchEmailService' as const;
  export type Input = {
    data: {
      studentId: string;
      type: EmailTypes;
      data?: object;
    };
  };

  export type Output = void;
}

export interface DispatchEmailService {
  dispatch: (input: DispatchEmailService.Input) => Promise<DispatchEmailService.Output>;
}
