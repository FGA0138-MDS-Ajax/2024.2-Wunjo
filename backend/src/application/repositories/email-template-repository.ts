import { EmailTemplate, EmailTypes } from '@/domain';

export namespace EmailTemplateRepository {
  export const Name = 'EmailTemplateRepository';

  export namespace Get {
    export type Input = {
      type: EmailTypes;
    };

    export type Output = EmailTemplate | null;
  }
}

export interface EmailTemplateRepository {
  getByType: (
    params: EmailTemplateRepository.Get.Input,
  ) => Promise<EmailTemplateRepository.Get.Output>;
}
