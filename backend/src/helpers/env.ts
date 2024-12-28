import { env } from '@/env';

export const isProdEnv = env.NODE_ENV === 'prod';
export const isTestEnv = env.NODE_ENV === 'test';
