import { CustomError } from './custom-error';

export class UserNotFoundError extends CustomError {
  constructor() {
    super('User not found', 'User not found error', 404);
  }
}
