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
        seasons: {
          connectOrCreate: params.seasons?.map((season) => ({
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

    return student;
  }

  async update(
    _id: string,
    _params: StudentRepository.Update.Input,
  ): Promise<StudentRepository.Update.Output> {
    throw new Error('Method not implemented.');
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
