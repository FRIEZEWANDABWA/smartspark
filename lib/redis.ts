import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
  enableReadyCheck: false,
  maxRetriesPerRequest: null,
});

export default redis;
