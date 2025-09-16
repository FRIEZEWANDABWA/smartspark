import redis from './redis';

export async function getFromCache(key: string) {
  try {
    const cached = await redis.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error('Cache get error:', error);
    return null;
  }
}

export async function setCache(key: string, data: any, ttl: number = 3600) {
  try {
    await redis.setex(key, ttl, JSON.stringify(data));
  } catch (error) {
    console.error('Cache set error:', error);
  }
}
