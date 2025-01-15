import { CustomError } from './custom-error';

export class UnauthenticatedError extends CustomError {
  constructor() {
    super('Usuário não foi autenticado!', 'Authentication Error', 401);
  }
}
