import { QuestionRepository } from '@/application/repositories';
import { prisma } from '@/infra/orm/prisma/datasource';
import { QuestionPrismaRepository } from '@/infra/orm/prisma/repositories';
import { QuestionBuilder } from '@tests/helper/builders/question-builder';
import { StudentBuilder } from '@tests/helper/builders/student-builder';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

describe('Create QuestionPrismaRepository and Delete', () => {
  let repo: QuestionRepository;
  const studentBuilder = StudentBuilder.aStudent();
  const student = studentBuilder.get();
  const questionBuilder = QuestionBuilder.aQuestion()
    .withParams({
      studentId: student.id,
    });

  const question = questionBuilder.get();

  beforeAll(async () => {
    await studentBuilder.save();
    await questionBuilder.save();
    repo = new QuestionPrismaRepository(prisma);
  });

  afterAll(async () => {
    await prisma.$queryRaw`TRUNCATE TABLE "questions" CASCADE;`;
    await prisma.$queryRaw`TRUNCATE TABLE "students" CASCADE;`;
  });

  it('should delete a question', async () => {
    const has_deleted = await repo.delete({ id: question.id });
    expect(has_deleted).toEqual(true);
  });
});
