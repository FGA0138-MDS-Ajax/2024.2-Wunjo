import { CustomError } from './custom-error';

export class UnauthenticatedError extends CustomError {
  constructor(message?: string, type?: string) {
    super(
      message ?? 'Usuário não foi autenticado!',
      type ?? 'UnauthenticatedError',
      401,
    );
  }
}
