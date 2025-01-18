import { StudentRepository } from '@/application/repositories/student-repository';
import { prisma } from '@/infra/orm/prisma/datasource';
import { StudentPrismaRepository } from '@/infra/orm/prisma/repositories';
import { faker } from '@faker-js/faker';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { getError } from '@tests/helper';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create StudentPrismaRepository', () => {
  let repo: StudentRepository;
  const input = StudentBuilder.aStudent().get();

  beforeAll(async () => {
    repo = new StudentPrismaRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "students" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "season_student" CASCADE;`;
    await prisma.$executeRaw`TRUNCATE TABLE "season" CASCADE;`;
  });

  it('should create a student', async () => {
    const student = await repo.create(input);

    expect(student).toEqual({
      id: input.id,
      name: input.name,
      email: input.email,
      status: input.status,
      avatar: input.avatar,
      avatarUrl: input.avatarUrl,
      course: input.course,
      password: input.password,
      rankingParticipant: input.rankingParticipant,
      registration: input.registration,
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    } as StudentRepository.Create.Output);
  });

  it('should create student with season', async () => {
    await prisma.$executeRaw`TRUNCATE TABLE "students" CASCADE;`;
    const season = await prisma.season.create({
      data: {
        name: 'Season create student test',
        period: '24.2',
      },
    });

    const seasonInput = {
      id: faker.string.uuid(),
      points: faker.number.int({ min: 0, max: 100 }),
      seasonId: season.id,
      studentId: input.id,
    };

    await repo.create({
      ...input,
      seasons: [
        {
          id: seasonInput.id,
          points: seasonInput.points,
          seasonId: seasonInput.seasonId,
        },
      ],
    });

    const student = await prisma.student.findUnique({
      where: { id: input.id },
      include: { seasons: true },
    });

    expect(student).toEqual({
      id: input.id,
      name: input.name,
      email: input.email,
      status: input.status,
      avatar: input.avatar,
      avatarUrl: input.avatarUrl,
      course: input.course,
      password: input.password,
      rankingParticipant: input.rankingParticipant,
      registration: input.registration,
      seasons: [
        {
          id: seasonInput.id,
          points: seasonInput.points,
          seasonId: season.id,
          studentId: input.id,
        },
      ],
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    });
  });

  it('should return error if student already exists', async () => {
    const error = await getError<PrismaClientKnownRequestError>(() =>
      repo.create(input),
    );

    expect(error.message).toContain(
      'Unique constraint failed on the fields: (`id`)',
    );
    expect(error).toMatchObject({
      code: 'P2002',
      name: 'PrismaClientKnownRequestError',
    } as PrismaClientKnownRequestError);
  });
});
