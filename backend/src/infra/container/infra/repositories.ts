import {
  EmailRepository,
  EmailTemplateRepository,
  StudentRepository,
} from '@/application/repositories';
import { RedisCache } from '@/infra/cache';
import { EmailCacheRepository } from '@/infra/cache/repositories';
import { prisma } from '@/infra/orm/prisma/datasource';
import {
  EmailTemplatePrismaRepository,
  StudentPrismaRepository,
} from '@/infra/orm/prisma/repositories';
import { DIContainer } from 'rsdi';

// eslint-disable-next-line antfu/no-top-level-await
const redisCache = await RedisCache.connect();

export function configureInfraRepositoryDI() {
  return new DIContainer()
    .add('pgDataSource', () => prisma)
    .add('redisCache', () => redisCache)
    .add(
      StudentRepository.Name,
      ({ pgDataSource }) => new StudentPrismaRepository(pgDataSource),
    )
    .add(
      EmailRepository.Name,
      ({ redisCache }) => new EmailCacheRepository(redisCache),
    )
    .add(
      EmailTemplateRepository.Name,
      ({ pgDataSource }) => new EmailTemplatePrismaRepository(pgDataSource),
    );
}

export type DIRepository = ReturnType<typeof configureInfraRepositoryDI>;
