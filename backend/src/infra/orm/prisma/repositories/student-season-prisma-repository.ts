import { StudentSeasonRepository } from '@/application/repositories';
import { PrismaClient } from '@prisma/client';

export class StudentSeasonPrismaRepository implements StudentSeasonRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getAll(
    params: StudentSeasonRepository.GetAll.Input,
  ): Promise<StudentSeasonRepository.GetAll.Output> {
    return await this.prisma.seasonStudent.findMany({
      ...params,
      include: {
        student: true,
      },
    });
  }

  async update(
    id: string,
    params: StudentSeasonRepository.Update.Input,
  ): Promise<StudentSeasonRepository.Update.Output> {
    return await this.prisma.seasonStudent.update({
      where: {
        id,
      },
      data: {
        ...params,
      },
    });
  }

  async updateBy(
    where: StudentSeasonRepository.UpdateBy.Where,
    params: StudentSeasonRepository.UpdateBy.Input,
  ): Promise<StudentSeasonRepository.UpdateBy.Output> {
    const updated = await this.prisma.seasonStudent.updateMany({
      where: {
        studentId: where.studentId,
        seasonId: where.seasonId,
      },
      data: {
        ...params,
      },
    });

    if (updated.count === 0) {
      return null;
    }

    return this.prisma.seasonStudent.findFirst({
      where: {
        studentId: where.studentId,
        seasonId: where.seasonId,
      },
    });
  }

  async getBy(
    params: StudentSeasonRepository.GetBy.Input,
  ): Promise<StudentSeasonRepository.GetBy.Output> {
    const seasonStudent = await this.prisma.seasonStudent.findFirst({
      where: {
        ...params,
      },
    });

    if (!seasonStudent) {
      return null;
    }

    return seasonStudent;
  }
}
