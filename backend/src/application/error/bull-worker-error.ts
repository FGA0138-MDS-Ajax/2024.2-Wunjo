import { CustomError } from './custom-error';

export class BullWorkerError extends CustomError {
  public worker: string;

  constructor(message: string, worker: string) {
    super(message, 'BullWorkerError');
    this.worker = worker;
  }
}
