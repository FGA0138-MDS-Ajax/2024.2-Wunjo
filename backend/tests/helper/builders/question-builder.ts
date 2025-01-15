import { Question, QuestionDifficulties, QuestionDifficulty, QuestionUrgencies, QuestionUrgency } from '@/domain';
import { prisma } from '@/infra/orm/prisma/datasource';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export class QuestionBuilder {
  private data: Question;
  private readonly prisma: PrismaClient;

  private constructor() {
    this.prisma = prisma;
    this.data = {
      subjectId: faker.string.uuid(),
      title: faker.string.alpha({ length: { min: 1, max: 20 } }),
      description: faker.string.alpha({ length: { min: 1, max: 250 } }),
      points: faker.number.int(),
      status: faker.helpers.arrayElement(Object.values(['OPEN', 'IN_PROGRESS', 'FINISHED'])),
      difficulty: faker.helpers.arrayElement(Object.values(QuestionDifficulty)) as QuestionDifficulties,
      urgency: faker.helpers.arrayElement(Object.values(QuestionUrgency)) as QuestionUrgencies,
      tutorId: faker.string.uuid(),
      studentId: faker.string.uuid(),
      tutors: [],
      id: faker.string.uuid(),
    };
  }

  static aQuestion(): QuestionBuilder {
    return new QuestionBuilder();
  }

  public get(): Question {
    return this.data;
  }
}
