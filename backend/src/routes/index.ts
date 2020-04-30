import { Router, Request, Response, NextFunction } from 'express';

import transactionsRouter from './transactions.routes';

import AppError from '../errors/AppError';

const routes = Router();

routes.use('/transactions', transactionsRouter);

routes.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.warn(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default routes;
