import process from 'node:process';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  PORT: z.coerce.number(),
  DATABASE_URL: z.string(),
  JWT_SECRET_KEY: z.string(),
  JWT_TOKEN_EXPIRATION: z.string(),
  REDIS_URL: z.string(),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables', parsedEnv.error.format());

  throw new Error('Invalid environment variables');
}

export const env = parsedEnv.data;
