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
      let newQuantity = existingHolding.quantity + (transaction.transactionType === 'buy' ? transaction.quantity : -transaction.quantity);
      let totalCost = existingHolding.averageBuyPrice * existingHolding.quantity + (transaction.transactionType === 'buy' ? transaction.quantity * transaction.pricePerUnit : 0);
      let newAverageBuyPrice = newQuantity > 0 ? totalCost / newQuantity : 0;

      return this.prisma.holding.update({
        where: { id: existingHolding.id },
        data: { quantity: newQuantity, averageBuyPrice: newAverageBuyPrice }
      });
    } else if (transaction.transactionType === 'buy') {
      return this.prisma.holding.create({
        data: {
          userId: transaction.userId,
          assetId: transaction.assetId,
          quantity: transaction.quantity,
          averageBuyPrice: transaction.pricePerUnit
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

    if (existingHolding) {
      let newQuantity = existingHolding.quantity - transaction.quantity;

      // Recalculate average buy price if it's a buy transaction
      if (transaction.transactionType === 'buy' && newQuantity > 0) {
        let totalSpent = (existingHolding.averageBuyPrice * existingHolding.quantity) - (transaction.pricePerUnit * transaction.quantity);
        let newAverageBuyPrice = totalSpent / newQuantity;

        return this.prisma.holding.update({
          where: { id: existingHolding.id },
          data: { quantity: newQuantity, averageBuyPrice: newAverageBuyPrice }
        });
      } else {
        // If no quantity remains or it's a sell transaction affecting quantity only
        return this.prisma.holding.delete({ where: { id: existingHolding.id } });
      }
    }
  }
}
