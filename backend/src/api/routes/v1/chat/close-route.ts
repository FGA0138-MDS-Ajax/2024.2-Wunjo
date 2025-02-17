import { CloseChatUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: CloseChatUsecase = container.get(CloseChatUsecase.Name);

  const ouput = await usecase.execute({
    chatRoomId: req.params.id,
    requesterId: req.user.id,
    avaliation: req.body.avaliation,
    hasBeenAnswered: req.body.hasBeenAnswered,
  });

  res.status(200).json(ouput);
}
