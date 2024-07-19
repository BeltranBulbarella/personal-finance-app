import { Module } from '@nestjs/common';
import { BalanceController } from './controllers/balance.controller';
import { BalanceService } from './services/balance.service';
import { HoldingsModule } from '../holdings/holdings.module';
import { CoreModule } from '../../services/CoreModule';

@Module({
  imports: [HoldingsModule, CoreModule],
  controllers: [BalanceController],
  providers: [BalanceService],
})
export class BalanceModule {}
