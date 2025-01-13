import { Email, EmailTypes } from '@/domain';

export namespace EmailRepository {
  export const Name = 'EmailRepository';

  export namespace Create {
    export type Input = {
      studentId: string;
      email: Email;
    };

    export type Output = Email;
  }

  export namespace Get {
    export type Input = {
      studentId: string;
      type: EmailTypes;
    };

    export type Output = Email | null;
  }

  export namespace Delete {
    export type Input = {
      studentId: string;
      type: EmailTypes;
    };

    export type Output = boolean;
  }
}

export interface EmailRepository {
  create: (
    params: EmailRepository.Create.Input,
  ) => Promise<EmailRepository.Create.Output>;
  get: (
    params: EmailRepository.Get.Input,
  ) => Promise<EmailRepository.Get.Output>;
  del: (
    params: EmailRepository.Delete.Input,
  ) => Promise<EmailRepository.Delete.Output>;
}
