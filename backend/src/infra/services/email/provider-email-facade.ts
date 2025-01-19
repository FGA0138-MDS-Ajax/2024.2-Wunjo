import { ProviderEmailService } from '@/application/services';
import { NodemailerService } from './nodemailer-service';

export const EmailProviderTypes = {
  NODEMAILER: 'NODEMAILER',
  RESEND: 'RESEND',
} as const;

export type ProviderType = keyof typeof EmailProviderTypes;

export class ProviderEmailServiceFacade {
  private nodemailerProvider: NodemailerService;
  constructor() {
    this.nodemailerProvider = new NodemailerService();
  }

  async send(input: ProviderEmailService.Input): Promise<void> {
    return this.nodemailerProvider.send(input);
  }
}
