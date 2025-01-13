import { EmailTemplateRepository } from '@/application/repositories';
import { PrismaClient } from '@prisma/client';

export class EmailTemplatePrismaRepository implements EmailTemplateRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getByType(
    type: EmailTemplateRepository.Get.Input,
  ): Promise<EmailTemplateRepository.Get.Output> {
    return await this.prisma.emailTemplates.findFirst({
      where: {
        type: type as unknown as string,
      },
    });
  }
}
