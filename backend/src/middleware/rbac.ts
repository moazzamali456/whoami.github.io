import { Request, Response, NextFunction } from 'express';
export const rbacMiddleware = (role: string) => (req: Request, res: Response, next: NextFunction) => {
  // TODO: Check user role from req.user
  if (req.user?.role !== role) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};
