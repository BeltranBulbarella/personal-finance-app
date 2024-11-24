import { Module, Global } from '@nestjs/common';
import redisClient from './redis';

@Global() // Makes the module global, no need to import it elsewhere
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      useValue: redisClient,
    },
  ],
  exports: ['REDIS_CLIENT'],
})
export class RedisModule {}
