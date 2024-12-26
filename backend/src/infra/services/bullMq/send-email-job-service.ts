import { DispatchEmailService } from '@/application/services/email';
import logger from '@/infra/logger';
import { BullMQ } from '@/messsaging/bullmq';
import { bullMQQueueNames } from '@/messsaging/bullmq/types';

export class DispatchEmailJobService implements DispatchEmailService {
  async dispatch(input: DispatchEmailService.Input): Promise<void> {
    logger.info({
      message: 'NotifySendEmailJobService.dispatch',
      input,
    });
    await BullMQ.createJob(bullMQQueueNames.SEND_EMAIL, input.data);
  }
}
