import http from 'node:http';
import process from 'node:process';
import { Server } from 'socket.io';
import { z } from 'zod';
import { api } from './api';
import { env } from './env';
import { RedisCache } from './infra/cache';
import logger from './infra/logger/pino';
import { prisma } from './infra/orm/prisma/datasource';
import { BullMQ } from './messsaging/bullmq';
import { Socket } from './messsaging/socket';

export const notification_devices : Array<string> = [];

export function apiProvider() {
  return http.createServer(api).listen(env.PORT, '0.0.0.0', () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
}

// Global error handlers
process.on('uncaughtException', (error) => {
  logger.error(error.message, `Uncaught Exception: `, 'MSG');
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error(reason, `Unhandled Rejection at: ${promise}`, 'MSG');
});

export function databaseProvider() {
  logger.info('Connecting with database');

  prisma.$connect();

  logger.info('Database connected');

  prisma.$disconnect();
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

export async function bullMQProvider(): Promise<void> {
  try {
    logger.info('Setting up and initialize BullMQ');

    await BullMQ.setupAndInitWorkersAndQueues();

    logger.info('BullMQ connected');
  } catch (error) {
    logger.error(error, 'Error on setting up BullMQ', 'MSG');
  }
}

export async function socket(server: http.Server) {
  logger.info('Setting up socket...');

  const ioServer = new Server(server);

  Socket.getInstance(ioServer);

  logger.info('Socket is up!');
}

export async function server() {
  logger.info('Setting up server...');

  databaseProvider();
  await redisProvider();
  await bullMQProvider();
  const httpServer = apiProvider();
  await socket(httpServer);

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