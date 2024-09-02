import Redis from 'ioredis';

// Initialize Redis client
const redisClient = new Redis();

// Handle connection events
redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

export default redisClient;
