import { Job } from 'bullmq';
import { bullMQQueueNames } from '../types';
import { sendEmailWorker } from './send-email/send-email-worker';

export const workers = {
  [bullMQQueueNames.SEND_EMAIL]: (data: Job) => sendEmailWorker(data),
};
