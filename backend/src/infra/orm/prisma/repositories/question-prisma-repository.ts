import { QuestionRepository } from '@/application/repositories';
import { PrismaClient } from '@prisma/client';

export class QuestionPrismaRepository implements QuestionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    params: QuestionRepository.Create.Input,
  ): Promise<QuestionRepository.Create.Output> {
    const question = await this.prisma.question.create({
      data: {
        id: params.id,
        subjectId: params.subjectId,
        title: params.title,
        description: params.description,
        points: params.points,
        status: params.status,
        difficulty: params.difficulty,
        urgency: params.urgency,
        tutorId: params.tutorId,
        studentId: params.studentId,
      },
    });

    return {
      ...question,
      tutors: question.tutors.map((tutor: any) => ({
        avaliation: tutor.avaliation,
        chatRoomId: tutor.chatRoomId,
        id: tutor.id,
      })),
    };
  }

  async update(
    _id: string,
    _params: QuestionRepository.Update.Input,
  ): Promise<QuestionRepository.Update.Output> {
    throw new Error('Not implemented');
  }

  async findBy(
    _params: QuestionRepository.FindBy.Input,
  ): Promise<QuestionRepository.FindBy.Output> {
    throw new Error('Not implemented');
  }

  async findAll(
    _params: QuestionRepository.FindAll.Input,
  ): Promise<QuestionRepository.FindAll.Output> {
    throw new Error('Not implemented');
  }

  async delete(
    params: QuestionRepository.Delete.Input,
  ): Promise<QuestionRepository.Delete.Output> {
    const question = await this.prisma.question.delete({
      where: {
        id: params.id,
      },
    });

    return !!question;
  }
}
