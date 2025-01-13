import { EmailRepository, EmailTemplateRepository } from '@/application/repositories';
import { StudentRepository } from '@/application/repositories/student-repository';
import { RedisCache } from '@/infra/cache';
import { EmailCacheRepository } from '@/infra/cache/repositories/email-cache-repository';
import { prisma } from '@/infra/orm/prisma/datasource';
import { StudentPrismaRepository } from '@/infra/orm/prisma/repositories';
import { EmailTemplatePrismaRepository } from '@/infra/orm/prisma/repositories/email-template-prisma-repository';
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
