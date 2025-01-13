import { ProviderEmailService } from '@/application/services';
import { env } from '@/env';
import nodemailer, { Transporter } from 'nodemailer';

export class NodemailerService implements ProviderEmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL_AUTH_USER,
        pass: env.GMAIL_AUTH_PASS,
      },
    });
  }

  async send(input: ProviderEmailService.Input): Promise<void> {
    await this.transporter.sendMail({
      from: input.from,
      to: input.to,
      subject: input.subject,
      html: input.html,
    });
  }
}
