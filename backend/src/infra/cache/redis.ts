import { env } from '@/env';
import { isTestEnv } from '@/helpers/env';
import IORedis from 'ioredis';
import RedisMemoryServer from 'redis-memory-server';

export class RedisCache {
  private client: IORedis;
  private static instance: RedisCache;

  private constructor(url?: any) {
    const conn = url ?? env.REDIS_URL;

    this.client = new IORedis(conn, { maxRetriesPerRequest: null });
  }

  public static async connect(): Promise<RedisCache> {
    if (this.instance) {
      return this.instance;
    }

    let config;
    if (isTestEnv) {
      const redisServer = new RedisMemoryServer();
      const fakeInstance = await redisServer._startUpInstance();
      config = `redis://${fakeInstance.ip}:${fakeInstance.port}`;
    }

    this.instance = new RedisCache(config);
    await this.instance.connection();
    return this.instance;
  }

  public async connection(): Promise<void> {
    if (['close', 'end'].includes(this.client.status)) {
      await this.client.connect();
    }
  }

  public disconnect(): void {
    this.client.disconnect();
  }

  public async set<T extends object = object>(
    key: string,
    value: T,
    expiresIn?: number,
  ): Promise<T | null> {
    try {
      await this.client.set(key, JSON.stringify(value));

      if (expiresIn) {
        await this.client.expire(key, expiresIn);
      }

      return value;
    } catch {
      return null;
    }
  }

  public async get<T = object>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    return JSON.parse(data) as T;
  }

  public async del(key: string): Promise<number> {
    return await this.client.del(key);
  }
}
