import { StudentRepository } from '@/application/repositories/student-repository';
import { PrismaClient } from '@prisma/client';

export class StudentPrismaRepository implements StudentRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    params: StudentRepository.Create.Input,
  ): Promise<StudentRepository.Create.Output> {
    const student = await this.prisma.student.create({
      data: {
        id: params.id,
        name: params.name,
        registration: params.registration,
        email: params.email,
        avatar: params.avatar,
        avatarUrl: params.avatarUrl,
        course: params.course,
        password: params.password,
        rankingParticipant: params.rankingParticipant,
        status: params.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        ...(params.questions && params.questions.length > 0 && {
          questions: {
            connectOrCreate: params.questions?.map((question) => ({
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
        }),
        ...(params.seasons && params.seasons.length > 0 && {
          seasons: {
            connectOrCreate: params.seasons?.map((season) => ({
              where: { id: season.id },
              create: {
                id: season.id,
                points: season.points,
                seasonId: season.seasonId,
              },
            })),
          },
        }),
      },
    });

    return student;
  }

  async update(
    id: string,
    params: StudentRepository.Update.Input,
  ): Promise<StudentRepository.Update.Output> {
    const student = await this.prisma.student.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });

    return student;
  }

  async findBy(
    params: StudentRepository.FindBy.Input,
  ): Promise<StudentRepository.FindBy.Output> {
    const student = await this.prisma.student.findFirst({
      where: {
        ...params.where,
      },
      include: {
        ...params.relations,
      },
    });

    return student;
  }
}
