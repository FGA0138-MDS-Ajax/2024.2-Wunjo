import { prisma } from '@/infra/orm/prisma/datasource';
import { DIContainer } from 'rsdi';

export function configureInfraRepositoryDI() {
  return new DIContainer().add('pgDataSource', () => prisma);
}

export type DIRepository = ReturnType<typeof configureInfraRepositoryDI>;
