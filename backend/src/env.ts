import process from 'node:process';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_TOKEN_EXPIRATION: z.string(),
  REDIS_URL: z.string(),
  GMAIL_AUTH_USER: z.string().optional(),
  GMAIL_AUTH_PASS: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  FIREBASE_KEY: z.string().optional(),
  FIREBASE_EMAIL: z.string().optional(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error.format());

  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
