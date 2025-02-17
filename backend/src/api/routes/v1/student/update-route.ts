import { UpdateStudentUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase: UpdateStudentUsecase = container.get(
    UpdateStudentUsecase.Name,
  );

  const output = await usecase.execute({
    studentId: req.user.id,
    avatar: req.body.avatar,
    course: req.body.course,
    name: req.body.name,
    rankingParticipant: req.body.rankingParticipant,
  });

  res.status(200).send(output);
}
