import {
  BullWorkerError,
  NotFoundError,
  ValidationError,
} from '@/application/error';
import { SendEmailUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import logger from '@/infra/logger';
import { Job } from 'bullmq';
import { bullMQQueueNames } from '../../types';

export async function sendEmailWorker(job: Job) {
  try {
    const usecase: SendEmailUsecase = container.get(SendEmailUsecase.Name);

    await usecase.execute(job.data);
  } catch (err) {
    logger.error(err, 'sendEmailWorker', 'BWE');

    if (err instanceof ValidationError) {
      await job.remove();
      throw new TypeError('Invalid job data');
    }

    if (err instanceof NotFoundError) {
      try {
        await job.remove();
      } catch (err) {
        logger.info({ err });
      }
    }

    throw new BullWorkerError('Send email worker', bullMQQueueNames.SEND_EMAIL);
  }
}
