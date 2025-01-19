import {
  Question,
  QuestionDifficulties,
  QuestionDifficulty,
  QuestionUrgencies,
  QuestionUrgency,
} from '@/domain';
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
      points: faker.number.int({
        min: 1,
        max: 100,
      }),
      status: faker.helpers.arrayElement(
        Object.values(['OPEN', 'IN_PROGRESS', 'FINISHED']),
      ),
      difficulty: faker.helpers.arrayElement(
        Object.values(QuestionDifficulty),
      ) as QuestionDifficulties,
      urgency: faker.helpers.arrayElement(
        Object.values(QuestionUrgency),
      ) as QuestionUrgencies,
      tutorId: faker.string.uuid(),
      studentId: faker.string.uuid(),
      tutors: [],
      id: faker.string.uuid(),
    };
  }

  public withParams(params: Partial<Question>): QuestionBuilder {
    for (const key in params) {
      const _key = key as keyof typeof params;
      if (typeof params[_key] !== 'undefined') {
        if (typeof params[_key] === 'object') {
          if (
            typeof this.data[_key] === 'object'
            && typeof params[_key] === 'object'
          ) {
            // @ts-expect-error ype 'Question[] | StudentSeason[] | Date' is not assignable to type 'never'. Type 'Question[]' is not assignable to type 'never'
            this.data[_key] = { ...this.data[_key], ...params[_key] };
          } else {
            // @ts-expect-error ype 'Question[] | StudentSeason[] | Date' is not assignable to type 'never'. Type 'Question[]' is not assignable to type 'never'
            this.data[_key] = params[_key];
          }
          continue;
        } else {
          // @ts-expect-error ype 'Question[] | StudentSeason[] | Date' is not assignable to type 'never'. Type 'Question[]' is not assignable to type 'never'
          this.data[_key] = params[_key];
        }
      }
    }
    return this;
  }

  static aQuestion(): QuestionBuilder {
    return new QuestionBuilder();
  }

  public get(): Question {
    return this.data;
  }

  public async save(): Promise<Question> {
    const question = await this.prisma.question.create({
      data: this.data,
    });

    return {
      ...question,
      tutors: (question.tutors as Question['tutors']).map((item) => ({
        id: item.id,
        avaliation: item.avaliation,
        chatRoomId: item.chatRoomId,
      })),
    }
  }
}
