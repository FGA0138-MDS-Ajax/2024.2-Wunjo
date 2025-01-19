import logger from '@/infra/logger';
import { CustomError } from './custom-error';

export class DbError extends CustomError {
  constructor(message: string) {
    super(message, 'DbError');
    logger.info({
      message: 'DbError >',
      error: { message },
    });
  }
}
