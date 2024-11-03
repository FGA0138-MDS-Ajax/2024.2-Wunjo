import { NextFunction, Request, Response } from 'express';

export function errorHandler(
  error: any,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!error) {
    next();
  }

  if (error instanceof Error) {
    res.status(500).json({
      type: error.name,
      error: error.message,
      stack: error.stack,
    });
  }

  res.status(503).json({
    type: 'Unable to process request',
    message: error,
  });
}
