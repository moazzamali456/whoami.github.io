import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { config } from '../config/env';

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 12);
};

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateAccessToken = (userId: number, role: string): string => {
  return jwt.sign({ userId, role }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.ACCESS_TOKEN_TTL,
  } as jwt.SignOptions);
};

export const generateRefreshToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};

export const hashRefreshToken = (token: string): string => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const verifyAccessToken = (token: string): { userId: number; role: string } => {
  return jwt.verify(token, config.ACCESS_TOKEN_SECRET) as { userId: number; role: string };
};
