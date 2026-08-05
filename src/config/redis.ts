import Redis from 'ioredis';

let redisClient: Redis | null = null;

try {
  redisClient = new Redis(process.env.REDIS_URL || 'redis://127.0.0.1:6379', {
    maxRetriesPerRequest: 1,
    retryStrategy(times: number) {
      if (times > 3) {
        console.warn('[Redis TS] Unable to connect after 3 retries. Operating in fallback mode.');
        return null;
      }
      return Math.min(times * 100, 2000);
    }
  });

  redisClient.on('connect', () => {
    console.log('[Redis TS] Connected successfully');
  });

  redisClient.on('error', (err: Error) => {
    console.warn(`[Redis TS Warning] ${err.message}`);
  });
} catch (err: any) {
  console.warn(`[Redis TS Setup Warning] ${err.message}`);
}

export default redisClient;
