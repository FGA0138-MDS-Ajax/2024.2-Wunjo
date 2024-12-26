import { LoginUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: LoginUsecase = container.get('LoginUsecase');
  const output = await usecase.execute({
    registration: req.body?.registration,
    password: req.body?.password,
  });
  return res.json(output);
}
