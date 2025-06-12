import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';

  logger.error(`Error: ${message}`, {
    method: req.method,
    url: req.originalUrl,
    status,
    stack: err.stack,
  });

  const response = {
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
  };

  res.status(status).json(response);
}
