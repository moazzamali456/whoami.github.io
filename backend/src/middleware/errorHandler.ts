import { Request, Response, NextFunction } from 'express';
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Internal server error';
  res.status(status).json({ message });
};
