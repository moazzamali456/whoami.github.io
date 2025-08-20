import { z } from 'zod';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT: z.coerce.number().min(1),
  DB_USER: z.string().min(1),
  DB_PASS: z.string().min(1),
  DB_NAME: z.string().min(1),
  ACCESS_TOKEN_SECRET: z.string().min(32),
  ACCESS_TOKEN_TTL: z.string().min(2),
  REFRESH_TOKEN_SECRET: z.string().min(32),
  REFRESH_TOKEN_TTL: z.string().min(2),
  CORS_ORIGINS: z.string().min(1),
  RATE_LIMIT_WINDOW: z.string().min(2),
  RATE_LIMIT_MAX: z.coerce.number().min(1),
  LOGIN_RATE_LIMIT_MAX: z.coerce.number().min(1),
  CRYPTO_ENC_KEY: z.string().min(32),
  COOKIE_SECURE: z.coerce.boolean(),
  COOKIE_DOMAIN: z.string().min(1),
});

const env = envSchema.safeParse(process.env);
if (!env.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

export const config = env.data;
