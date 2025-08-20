import { Request, Response, NextFunction } from 'express';
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // TODO: Verify JWT access token, attach user to req
  next();
};
