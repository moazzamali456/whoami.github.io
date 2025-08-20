import { Request, Response, NextFunction } from 'express';
// ...implement login, refresh, logout logic here...
export const login = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Validate input, check user, password, lockout, issue tokens
  res.status(501).json({ message: 'Not implemented' });
};
export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Validate refresh token, rotate, issue new access token
  res.status(501).json({ message: 'Not implemented' });
};
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  // TODO: Invalidate refresh token
  res.status(501).json({ message: 'Not implemented' });
};
