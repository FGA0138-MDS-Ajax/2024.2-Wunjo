import { RankingUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (_req: Request, res: Response) {
  const usecase: RankingUsecase = container.get(RankingUsecase.Name);

  const ouput = await usecase.execute();

  res.status(200).json(ouput);
}
