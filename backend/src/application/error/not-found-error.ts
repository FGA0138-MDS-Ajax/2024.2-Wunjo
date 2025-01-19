import { CustomError } from './custom-error';

export const RegisterOptions = {
  STUDENT: 'ESTUDANTE',
  EMAIL_TEMPLATE: 'EMAIL_TEMPLATE',
} as const;

export type RegisterOptions = keyof typeof RegisterOptions;

export class NotFoundError extends CustomError {
  public register: RegisterOptions;
  constructor(message: string, register: RegisterOptions) {
    super(message, 'Not found error', 404);
    this.register = register;
  }
}
