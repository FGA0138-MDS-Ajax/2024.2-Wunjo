import { UnauthenticatedError } from '@/application/error';
import { AuthUsecase } from '@/application/usecases';
import { container } from '@/infra/container';
import { NextFunction, Request, Response } from 'express';

export async function authMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  const usecase: AuthUsecase = container.get(AuthUsecase.Name);

  const [type, token] = (req.headers.authorization || '').split(' ');

  if (!type || type !== 'Bearer') {
    throw new UnauthenticatedError();
  }

  const output = await usecase.execute({
    token,
  });

  req.user = output;

  next();
}
