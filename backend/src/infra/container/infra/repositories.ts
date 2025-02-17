import {
  ChatRoomRepository,
  EmailRepository,
  EmailTemplateRepository,
  MessageRepository,
  PasswordRecoveryRepository,
  QuestionRepository,
  SeasonRepository,
  StudentRepository,
  StudentSeasonRepository,
} from '@/application/repositories';
import { RedisCache } from '@/infra/cache';
import {
  EmailCacheRepository,
  PasswordRecoveryCacheRepository,
} from '@/infra/cache/repositories';
import { prisma } from '@/infra/orm/prisma/datasource';
import {
  ChatRoomPrismaRepository,
  EmailTemplatePrismaRepository,
  MessagePrismaRepository,
  QuestionPrismaRepository,
  SeasonPrismaRepository,
  StudentPrismaRepository,
  StudentSeasonPrismaRepository,
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
    )
    .add(
      QuestionRepository.Name,
      ({ pgDataSource }) => new QuestionPrismaRepository(pgDataSource),
    )
    .add(
      PasswordRecoveryRepository.Name,
      ({ redisCache }) => new PasswordRecoveryCacheRepository(redisCache),
    )
    .add(
      ChatRoomRepository.Name,
      ({ pgDataSource }) => new ChatRoomPrismaRepository(pgDataSource),
    )
    .add(
      MessageRepository.Name,
      ({ pgDataSource }) => new MessagePrismaRepository(pgDataSource),
    )
    .add(
      SeasonRepository.Name,
      ({ pgDataSource }) => new SeasonPrismaRepository(pgDataSource),
    )
    .add(
      StudentSeasonRepository.Name,
      ({ pgDataSource }) => new StudentSeasonPrismaRepository(pgDataSource),
    );
}

export type DIRepository = ReturnType<typeof configureInfraRepositoryDI>;
