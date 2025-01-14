import {
  Course,
  Courses,
  Question,
  Season,
  Student,
  StudentRegistrationStatus,
  StudentRegistrationStatuses,
} from '@/domain';
import { prisma } from '@/infra/orm/prisma/datasource';
import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

export class StudentBuilder {
  private data: Student & {
    questions: Question[];
    seasons: Season[];
  };

  private readonly prisma: PrismaClient;

  private constructor() {
    this.prisma = prisma;
    this.data = {
      id: faker.string.uuid(),
      avatar: faker.image.avatar(),
      avatarUrl: faker.image.avatar(),
      course: faker.helpers.arrayElement(Object.values(Course)) as Courses,
      email: faker.internet.email(),
      name: faker.person.fullName(),
      password: faker.internet.password(),
      questions: [],
      rankingParticipant: faker.datatype.boolean(),
      registration: faker.string.numeric(9),
      seasons: [],
      status: faker.helpers.arrayElement(
        Object.values(StudentRegistrationStatus),
      ) as StudentRegistrationStatuses,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  static aStudent(): StudentBuilder {
    return new StudentBuilder();
  }

  public withParams(params: Partial<Student>): StudentBuilder {
    for (const key in params) {
      const _key = key as keyof typeof params;
      if (typeof params[_key] !== 'undefined') {
        if (typeof params[_key] === 'object') {
          if (
            typeof this.data[_key] === 'object' && typeof params[_key] === 'object'
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

  public get(): Student {
    return this.data;
  }

  public async save(): Promise<
    Student & {
      questions: Question[];
      seasons: Season[];
    }
  > {
    const student = await this.prisma.student.create({
      data: {
        id: this.data.id,
        name: this.data.name,
        registration: this.data.registration,
        email: this.data.email,
        avatar: this.data.avatar,
        avatarUrl: this.data.avatarUrl,
        course: this.data.course,
        password: this.data.password,
        rankingParticipant: this.data.rankingParticipant,
        status: this.data.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        questions: {
          connectOrCreate: this.data.questions.map((question) => ({
            where: { id: question.id },
            create: {
              id: question.id,
              description: question.description,
              difficulty: question.difficulty,
              points: question.points,
              status: question.status,
              subjectId: question.subjectId,
              title: question.title,
              tutorId: question.tutorId,
              urgency: question.urgency,
              tutors: {
                set: question.tutors.map((tutor) => ({
                  id: tutor.id,
                  avaliations: tutor.avaliation,
                  chatRoomId: tutor.chatRoomId,
                })),
              },
            },
          })),
        },
        seasons: {
          connectOrCreate: this.data.seasons.map((season) => ({
            where: { id: season.id },
            create: {
              id: season.id,
              points: season.points,
              seasonId: season.id,
            },
          })),
        },
      },
    });

    return {
      ...student,
      questions: this.data.questions,
      seasons: this.data.seasons,
    };
  }
}
