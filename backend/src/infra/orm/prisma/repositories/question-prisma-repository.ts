import { QuestionRepository } from '@/application/repositories';
import { Question } from '@/domain';
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
    params: QuestionRepository.FindBy.Input,
  ): Promise<QuestionRepository.FindBy.Output> {
    const question = await this.prisma.question.findFirst({
      where: {
        id: params.id,
        studentId: params.studentId,
        subjectId: params.subjectId,
        tutorId: params.tutorId,
        urgency: params.urgency,
        difficulty: params.difficulty,
      },
      include: params.include,
    });
    if (!question) {
      return null;
    }
    return {
      ...question,
      tutors: (question.tutors as Question['tutors']).map((item) => ({
        id: item.id,
        avaliation: item.avaliation,
        chatRoomId: item.chatRoomId,
      })),
    };
  }

  async findAll(
    params: QuestionRepository.FindAll.Input,
  ): Promise<QuestionRepository.FindAll.Output> {
    const questions = await this.prisma.question.findMany({
      where: {
        urgency: params.urgency,
        difficulty: params.difficulty,
      },
      include: params.include,
    });

    return questions.map((q) => ({
      ...q,
      tutors: (q.tutors as Question['tutors']).map((item) => ({
        id: item.id,
        avaliation: item.avaliation,
        chatRoomId: item.chatRoomId,
      })),
    }));
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
