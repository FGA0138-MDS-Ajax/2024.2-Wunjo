import { GetAllSubjectsUsecase } from '@/application/usecases/subject/get-all-subjects-usecase';
import { container } from '@/infra/container';
import { Request, Response } from 'express';

export default async function (req: Request, res: Response) {
  const usecase = container.get(GetAllSubjectsUsecase.Name);

  console.log(req.query);

  console.log('acessou a rota de subject');
  const subjects = await usecase.execute({
    sort: {
      name: req.query.sort as 'asc' | 'desc',
    },
    search: req.query.search as string,
  });

  res.status(200).json(subjects).send();
}
