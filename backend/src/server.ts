import http from 'node:http';
import { z } from 'zod';
import { api } from './api';
import { env } from './env';
import { RedisCache } from './infra/cache';
import logger from './infra/logger/pino';
import { prisma } from './infra/orm/prisma/datasource';
import { BullMQ } from './messsaging/bullmq';

export function apiProvider() {
  http.createServer(api).listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
}

export function databaseProvider() {
  logger.info('Connecting with database');

  prisma.$connect();

  logger.info('Database connected');

  prisma.$disconnect();
}

export async function bullMQProvider(): Promise<void> {
  try {
    logger.info('Setting up and initialize BullMQ');

    await BullMQ.setupAndInitWorkersAndQueues();

    logger.info('BullMQ connected');
  } catch (error) {
    logger.error(error, 'Error on setting up BullMQ', 'MSG');
  }
}

export async function redisProvider(): Promise<void> {
  try {
    logger.info('Setting up and initialize Redis');

    await RedisCache.connect();

    logger.info('Redis conencted');
  } catch (error) {
    logger.error(error, 'Error on setting up Redis', 'MSG');
  }
}

export async function server() {
  logger.info('Setting up server...');

  databaseProvider();
  await redisProvider();
  await bullMQProvider();
  apiProvider();

  logger.info('Server is up!');
}

const customErrorMap: z.ZodErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.expected === 'string') {
      return { message: 'Campo obrigatório' };
    }
  }

  if (issue.code === z.ZodIssueCode.custom) {
    return { message: `Campo inválido` };
  }

  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

server().catch(console.error);
