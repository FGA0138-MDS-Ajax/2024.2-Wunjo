import { DbError } from '@/application/error';
import { EmailRepository } from '@/application/repositories';
import logger from '@/infra/logger';
import { RedisCache } from '../redis';

export class EmailCacheRepository implements EmailRepository {
  constructor(private readonly cache: RedisCache) {}

  async create(
    params: EmailRepository.Create.Input,
  ): Promise<EmailRepository.Create.Output> {
    const data = await this.cache.set(
      `${params.studentId}@${params.email.type}:email`,
      params.email,
      60 * 60 * 24,
    );

    logger.info(`Email cache created ${JSON.stringify(data, null, 2)}`);

    if (!data) {
      throw new DbError(`Error creating email cache ${JSON.stringify(params)}`);
    }

    return data;
  }

  async get(
    params: EmailRepository.Get.Input,
  ): Promise<EmailRepository.Get.Output> {
    const data = await this.cache.get(
      `${params.studentId}@${params.type}:email`,
    );

    return data as EmailRepository.Get.Output;
  }

  async del(
    params: EmailRepository.Delete.Input,
  ): Promise<EmailRepository.Delete.Output> {
    const data = await this.cache.del(
      `${params.studentId}@${params.type}:email`,
    );

    return !!(data && data > 0);
  }
}
