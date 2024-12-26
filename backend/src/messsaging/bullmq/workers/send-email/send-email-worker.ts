import { BullWorkerError, ValidationError } from '@/application/error';
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
      throw new TypeError('Invalid job data');
    }

    throw new BullWorkerError('Send email worker', bullMQQueueNames.SEND_EMAIL);
  }
}
