import { Module } from '@nestjs/common';
import { TransactionsController } from './controllers/transactions.controller';
import { TransactionService } from './services/transactions.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionService, PrismaService],
})
export class TransactionsModule {}
