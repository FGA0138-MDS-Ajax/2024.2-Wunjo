import { GetChatUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: GetChatUsecase = container.get(GetChatUsecase.Name);

  const output = await usecase.execute({
    studentId: req.user.id,
    chatId: req.params.id,
  });

  res.json(output);
}
