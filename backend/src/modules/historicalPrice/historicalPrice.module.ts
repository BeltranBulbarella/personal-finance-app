import { Module } from '@nestjs/common';
import { CoreModule } from '../../services/CoreModule';
import { HistoricalPriceController } from './controller/historicalPrice.controller';
import { HistoricalPriceService } from './service/historicalPrice.service';

@Module({
  imports: [CoreModule],
  controllers: [HistoricalPriceController],
  providers: [HistoricalPriceService],
})
export class HistoricalPriceModule {}
