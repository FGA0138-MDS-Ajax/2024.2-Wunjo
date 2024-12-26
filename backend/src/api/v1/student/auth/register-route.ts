import { RegisterUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: RegisterUsecase = container.get(RegisterUsecase.Name);
  const output = await usecase.execute({
    name: req.body?.name,
    registration: req.body?.registration,
    course: req.body?.course,
    password: req.body?.password,
  });

  res.status(201).json(output);
}
