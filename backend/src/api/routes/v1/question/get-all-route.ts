import { GetAllQuestionsUsecase } from '@/application/usecases';
import { QuestionDifficulty, QuestionUrgency } from '@/domain';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: GetAllQuestionsUsecase = container.get(
    GetAllQuestionsUsecase.Name,
  );

  const output = await usecase.execute({
    filter: {
      difficulty: req.query.difficulty as keyof typeof QuestionDifficulty,
      urgency: req.query.urgency as keyof typeof QuestionUrgency,
    },
  });

  res.json(output);
}
