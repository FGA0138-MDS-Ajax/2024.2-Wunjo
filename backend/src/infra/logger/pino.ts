import { Logger } from '@/application/logger';
import pino, { Logger as IPinoLogger } from 'pino';

interface LoggerChildrens {
  API: IPinoLogger;
  MSG: IPinoLogger;
  HTTP: IPinoLogger;
}

export class PinoLogger implements Logger {
  private logger: IPinoLogger;

  private loggersChildrens;

  constructor() {
    this.logger = pino({
      name: 'wunjo-api',
      transport: { target: 'pino-pretty' },
    });

    this.loggersChildrens = this.createChildrens();
  }

  public info(message: string | object): void {
    this.logger.info(message);
  }

  public error(
    error: any,
    message: string,
    category: Logger.ErrorCategory,
  ): void {
    this.loggersChildrens[category].error(error, message);
  }

  private createChildrens(): LoggerChildrens {
    return {
      API: this.logger.child({ category: 'API' }),
      MSG: this.logger.child({ category: 'MSG' }),
      HTTP: this.logger.child({ category: 'HTTP' }),
    };
  }
}

const logger = new PinoLogger();

export default logger;
