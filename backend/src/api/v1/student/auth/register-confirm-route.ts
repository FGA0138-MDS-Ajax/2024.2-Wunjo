import { RegisterConfirmUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: RegisterConfirmUsecase = container.get(
    RegisterConfirmUsecase.Name,
  );
  const output = await usecase.execute({
    code: req.params.code,
  });

  const message = {
    true: 'Conta confirmada com sucesso',
    false: 'Código inválido',
  };

  res.status(200).send(message[output as unknown as keyof typeof message]);
}
