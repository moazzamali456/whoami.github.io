import rateLimit from 'express-rate-limit';
import { config } from '../config/env';
export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: config.LOGIN_RATE_LIMIT_MAX,
  message: 'Too many login attempts, please try again later.',
});
