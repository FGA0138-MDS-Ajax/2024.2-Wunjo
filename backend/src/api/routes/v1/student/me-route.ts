import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const student = {
    id: req.user.id,
    registration: req.user.registration,
    email: req.user.email,
    name: req.user.name,
    course: req.user.course,
    rankingParticipant: req.user.rankingParticipant,
    avatar: req.user.avatar,
    avatarUrl: req.user.avatarUrl,
    status: req.user.status,
    updatedAt: req.user.updatedAt,
    createdAt: req.user.createdAt,
  };

  res.status(200).send({
    student,
  });
}
