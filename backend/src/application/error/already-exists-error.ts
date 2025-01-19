import { CustomError } from './custom-error';

export const AlreadyExistsErrorType = {
  ESTUDANTE: 'ESTUDANTE',
  QUESTAO: 'QUESTAO',
} as const;

export type AlreadyExistsErrorTypes = keyof typeof AlreadyExistsErrorType;

export class AlreadyExistsError extends CustomError {
  public type: AlreadyExistsErrorTypes;

  constructor(type: AlreadyExistsErrorTypes) {
    super(`${type} já existe`, 'AlreadyExistsError', 400);
    this.type = type;
  }
}
