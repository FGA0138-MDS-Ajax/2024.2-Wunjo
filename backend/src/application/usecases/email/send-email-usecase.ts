import { env } from '@/env';
import { NotFoundError } from '@/application/error';
import {
  EmailTemplateRepository,
  StudentRepository,
} from '@/application/repositories';
import { EmailTemplate, EmailTypes } from '@/domain';
import { ProviderEmailServiceFacade } from '@/infra/services';

export class SendEmailUsecase {
  public static Name = 'SendEmailUsecase' as const;

  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly providerEmailServiceFacade: ProviderEmailServiceFacade,
    private readonly emailTemplatesRepository: EmailTemplateRepository,
  ) {}

  async execute(
    input: SendEmailUsecase.Input,
  ): Promise<SendEmailUsecase.Output> {
    const student = await this.studentRepository.findBy({
      where: {
        id: input.studentId,
      },
    });

    if (!student) {
      throw new NotFoundError('Student not found', 'STUDENT');
    }

    const template = await this.getTemplate(input.type);

    if (!template) {
      throw new NotFoundError('Email template not found.', 'EMAIL_TEMPLATE');
    }

    await this.providerEmailServiceFacade.send({
      from: `UnBordo <${env.EMAIL_FROM}>`,
      to: student?.email,
      html: this.parseTemplate(template.content, input.data || {}),
      subject: `🦜 ${template.subject} para ${student.name}`,
    });
  }

  private async getTemplate(type: EmailTypes): Promise<EmailTemplate | null> {
    return await this.emailTemplatesRepository.getByType({
      type,
    });
  }

  private parseTemplate(template: string, data: Record<string, string>) {
    return template.replace(/\{\{(.*?)\}\}/g, (_, match) => {
      const key = match.trim();
      return data[key] || '';
    });
  }
}

export namespace SendEmailUsecase {
  export type Input = {
    studentId: string;
    type: EmailTypes;
    data?: Record<string, string>;
  };

  export type Output = void;
}
