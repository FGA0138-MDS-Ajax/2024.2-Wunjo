import { CreateQuestionUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: CreateQuestionUsecase = container.get(
    CreateQuestionUsecase.Name,
  );

  const output = await usecase.execute({
    studentId: req.user.id,
    description: req.body.description,
    difficulty: req.body.difficulty,
    subjectId: req.body.subjectId,
    title: req.body.title,
    urgency: req.body.urgency,
  });

  res.json(output);
}
