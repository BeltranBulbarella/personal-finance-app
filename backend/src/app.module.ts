import { Module } from '@nestjs/common';
import { HealthController } from './modules/health/health.controller';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AssetsModule } from './modules/assets/assets.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { HoldingsModule } from './modules/holdings/holdings.module';
import { BalanceModule } from './modules/balance/balance.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    AssetsModule,
    TransactionsModule,
    HoldingsModule,
    BalanceModule,
  ],
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
