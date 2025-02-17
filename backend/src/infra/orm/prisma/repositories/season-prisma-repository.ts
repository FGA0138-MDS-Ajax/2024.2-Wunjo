import { SeasonRepository } from '@/application/repositories';
import { PrismaClient } from '@prisma/client';

export class SeasonPrismaRepository implements SeasonRepository {
  constructor(private readonly prisma: PrismaClient) {}
  async create(
    _params: SeasonRepository.Create.Input,
  ): Promise<SeasonRepository.Create.Output> {
    throw new Error('Method not implemented.');
  }

  async update(
    _id: string,
    _params: SeasonRepository.Update.Input,
  ): Promise<SeasonRepository.Update.Output> {
    throw new Error('Method not implemented.');
  }

  getById(_id: string): Promise<SeasonRepository.GetById.Output> {
    throw new Error('Method not implemented.');
  }

  async getLatest(): Promise<SeasonRepository.GetLatest.Output> {
    const season = await this.prisma.season.findFirst({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return season;
  }
}
