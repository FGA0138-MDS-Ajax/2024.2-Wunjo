import { GetQuestionUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: GetQuestionUsecase = container.get(GetQuestionUsecase.Name);

  const output = await usecase.execute({
    questionId: req.params.id,
  });

  res.json(output);
}
