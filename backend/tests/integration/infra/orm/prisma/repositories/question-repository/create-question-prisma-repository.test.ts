import { QuestionRepository, StudentRepository } from '@/application/repositories';
import { prisma } from '@/infra/orm/prisma/datasource';
import { QuestionPrismaRepository, StudentPrismaRepository } from '@/infra/orm/prisma/repositories';
import { QuestionBuilder } from '@tests/helper/builders/question-builder';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create QuestionPrismaRepository', () => {
  let repo: QuestionRepository;
  const input = QuestionBuilder.aQuestion().get();

  beforeAll(async () => {
    await prisma.$connect();
    repo = new QuestionPrismaRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await prisma.$executeRaw`'TRUNCATE TABLE "questions" CASCADE;'`;
  });

  it('should create a question', async () => {
    const question = await repo.create(input);

    expect(question).toEqual({
      subjectId: input.subjectId,
      title: input.title,
      description: input.description,
      points: input.points,
      status: input.status,
      difficulty: input.difficulty,
      urgency: input.urgency,
      tutorId: input.tutorId,
      studentId: input.studentId,
      tutors: [],
      id: input.id,
    } as QuestionRepository.Create.Output);
  });
});
