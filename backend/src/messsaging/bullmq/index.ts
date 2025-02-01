import { env } from '@/env';
import { isTestEnv } from '@/helpers/env';
import logger from '@/infra/logger';
import { DefaultJobOptions, Queue, Worker } from 'bullmq';
import IORedis from 'ioredis';
import { RedisMemoryServer } from 'redis-memory-server';
import { BullMQueueNames } from './types';
import { workers } from './workers';

const defaultRetryConfig: DefaultJobOptions = {
  attempts: 90,
  removeOnComplete: true,
  removeOnFail: true,
  delay: 1000,
  backoff: {
    type: 'fixed',
    delay: 2000,
  },
};

export class BullMQ {
  private static instance: BullMQ;
  private queues: { [key in BullMQueueNames]: Queue };
  private connection;
  private workers: { [key in BullMQueueNames]: any };

  private constructor(config: IORedis | object) {
    this.queues = <{ [key in BullMQueueNames]: Queue }>{};
    this.connection = config;
    this.workers = workers;
  }

  private static async getInstance(): Promise<BullMQ> {
    if (!BullMQ.instance) {
      const config = await BullMQ.getConfig();
      BullMQ.instance = new BullMQ(config);
    }

    return BullMQ.instance;
  }

  private static async getConfig() {
    let config;
    if (isTestEnv) {
      const redisServer = new RedisMemoryServer();
      const host = await redisServer.getHost();
      const port = await redisServer.getPort();
      config = { host, port };
    } else {
      config = new IORedis(env.REDIS_URL!, { maxRetriesPerRequest: null });

      config.on('connect', () => logger.info('BullMQ connected successfully'));
      config.on('error', err => logger.error(err, 'BullMQ connection error', 'MSG'));
    }

    return config;
  }

  public static async setupAndInitWorkersAndQueues(): Promise<void> {
    const bullMQ = await BullMQ.getInstance();

    await bullMQ.initializeWorkers();
    await bullMQ.initializeQueues();
  }

  public static async createJob<JobInput>(
    queueName: BullMQueueNames,
    data: JobInput,
    retryConfig?: DefaultJobOptions,
  ): Promise<void> {
    const bullMQ = await BullMQ.getInstance();

    if (!Object.keys(bullMQ.queues).includes(queueName)) {
      throw new Error(`Queue ${queueName} does not exists.`);
    }

    const retry = retryConfig ?? defaultRetryConfig;

    await bullMQ.queues[queueName].add(queueName, data, retry);
  }

  private async addQueue(queueName: BullMQueueNames): Promise<void> {
    const bullMQ = await BullMQ.getInstance();

    if (bullMQ.queues[queueName]) {
      return;
    }

    bullMQ.queues[queueName] = new Queue(queueName, {
      connection: bullMQ.connection,
      prefix: `{${queueName}}`,
    });
  }

  public static async addWorker(key: BullMQueueNames, worker: any) {
    const bullMQ = await BullMQ.getInstance();

    Object.assign(bullMQ.workers, { [key]: worker });
  }

  private async initializeWorkers(): Promise<void> {
    const bullMQ = await BullMQ.getInstance();

    Object.keys(bullMQ.workers).forEach((key) => {
      const queueName: BullMQueueNames = key as BullMQueueNames;

      const _w = new Worker(key, bullMQ.workers[queueName], {
        connection: bullMQ.connection,
        prefix: `{${key}}`,
      });
    });
  }

  private async initializeQueues(): Promise<void> {
    const bullMQ = await BullMQ.getInstance();

    Object.keys(bullMQ.workers).forEach(async (key) => {
      await bullMQ.addQueue(key as BullMQueueNames);
    });
  }
}
