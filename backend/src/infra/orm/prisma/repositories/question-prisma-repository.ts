import { QuestionRepository } from '@/application/repositories';
import { Question, Tutor } from '@/domain';
import { PrismaClient } from '@prisma/client';

export class QuestionPrismaRepository implements QuestionRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    params: QuestionRepository.Create.Input,
  ): Promise<QuestionRepository.Create.Output> {
    const question = await this.prisma.question.create({
      data: {
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
}
