import { Module } from '@nestjs/common';
import { HealthController } from './modules/health/health.controller';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
