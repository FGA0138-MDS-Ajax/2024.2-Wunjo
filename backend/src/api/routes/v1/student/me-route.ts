import { DetailsStudentUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: DetailsStudentUsecase = container.get(
    DetailsStudentUsecase.Name,
  );

  const output = await usecase.execute({ studentId: req.user.id });

  res.status(200).send({
    student: output,
  });
}
