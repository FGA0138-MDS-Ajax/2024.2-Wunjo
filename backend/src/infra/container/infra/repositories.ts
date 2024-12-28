import { StudentRepository } from '@/application/repositories/student-repository';
import { prisma } from '@/infra/orm/prisma/datasource';
import { StudentPrismaRepository } from '@/infra/orm/prisma/repositories';
import { DIContainer } from 'rsdi';

export function configureInfraRepositoryDI() {
  return new DIContainer()
    .add('pgDataSource', () => prisma)
    .add(
      StudentRepository.Name,
      ({ pgDataSource }) => new StudentPrismaRepository(pgDataSource),
    );
}

export type DIRepository = ReturnType<typeof configureInfraRepositoryDI>;
