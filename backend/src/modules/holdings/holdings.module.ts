import { Module } from '@nestjs/common';
import { HoldingsController } from './controllers/holdings.controller';
import { HoldingService } from './services/holdings.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  controllers: [HoldingsController],
  providers: [HoldingService, PrismaService],
  exports: [HoldingService],
})
export class HoldingsModule {}
