import { QuestionRepository } from '@/application/repositories';
import { prisma } from '@/infra/orm/prisma/datasource';
import { QuestionPrismaRepository } from '@/infra/orm/prisma/repositories';
import { QuestionBuilder } from '@tests/helper/builders/question-builder';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create QuestionPrismaRepository', () => {
  let repo: QuestionRepository;
  const studentBuilder = StudentBuilder.aStudent();
  const student = studentBuilder.get();
  const input = QuestionBuilder.aQuestion()
    .withParams({
      studentId: student.id,
    })
    .get();

  beforeAll(async () => {
    await studentBuilder.save();
    repo = new QuestionPrismaRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$queryRaw`TRUNCATE TABLE "questions" CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "students" CASCADE;`;
  });

  it('should create a question', async () => {
    const question = await repo.create(input);

    expect(question).toEqual({
      id: input.id,
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
    } as QuestionRepository.Create.Output);
  });
});
