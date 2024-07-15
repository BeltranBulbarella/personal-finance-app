import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { CreateTransactionDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {
  }

  async createTransaction(dto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.create({ data: dto });
    await this.handleHoldingAfterTransaction(dto);
    return transaction;
  }

  async updateTransaction(id: number, dto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.update({ where: { id }, data: dto });
    await this.handleHoldingAfterTransaction(dto);
    return transaction;
  }

  async deleteTransaction(id: number) {
    const transaction = await this.prisma.transaction.findUnique({ where: { id } });
    if (transaction) {
      await this.prisma.transaction.delete({ where: { id } });
      // Adjust holdings accordingly, potentially needing different logic
      await this.adjustHoldingAfterTransactionDeletion(transaction);
    }
  }

  async findAllTransactions() {
    return this.prisma.transaction.findMany();
  }

  async findOneTransaction(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  async handleHoldingAfterTransaction(transaction: CreateTransactionDto) {
    const existingHolding = await this.prisma.holding.findFirst({
      where: { userId: transaction.userId, assetId: transaction.assetId }
    });

    if (existingHolding) {
      const newQuantity = transaction.transactionType === 'buy'
        ? existingHolding.quantity + transaction.quantity
        : existingHolding.quantity - transaction.quantity;

      return this.prisma.holding.update({
        where: { id: existingHolding.id },
        data: { quantity: newQuantity }
      });
    } else if (transaction.transactionType === 'buy') {
      return this.prisma.holding.create({
        data: {
          userId: transaction.userId,
          assetId: transaction.assetId,
          quantity: transaction.quantity
        }
      });
    }
  }

  async adjustHoldingAfterTransactionDeletion(transaction: CreateTransactionDto) {
    const existingHolding = await this.prisma.holding.findFirst({
      where: {
        userId: transaction.userId,
        assetId: transaction.assetId
      }
    });

    if (!existingHolding) {
      // If no existing holding, no adjustment needed
      return null;
    }

    // Calculate new quantity based on transaction type
    const adjustedQuantity = transaction.transactionType === 'buy'
      ? existingHolding.quantity - transaction.quantity
      : existingHolding.quantity + transaction.quantity;

    if (adjustedQuantity <= 0) {
      // If adjusted quantity drops to zero or below, remove the holding
      await this.prisma.holding.delete({
        where: { id: existingHolding.id }
      });
    } else {
      // Otherwise, update the holding with the new quantity
      await this.prisma.holding.update({
        where: { id: existingHolding.id },
        data: { quantity: adjustedQuantity }
      });
    }
  }
}
