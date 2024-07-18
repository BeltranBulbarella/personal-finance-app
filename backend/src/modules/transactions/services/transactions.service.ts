import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { CreateTransactionDto } from '../dto/transaction.dto';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  async createTransaction(dto: CreateTransactionDto) {
    if (!dto.userId) {
      throw new BadRequestException('User ID must be provided');
    }

    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    // Check cash balance for buy transactions
    if (dto.transactionType === 'BUY') {
      const totalCost = dto.quantity * dto.pricePerUnit;
      if (user.cashBalance < totalCost) {
        throw new BadRequestException('Insufficient cash balance.');
      }
      // Deduct total cost from user's cash balance
      await this.prisma.user.update({
        where: { id: dto.userId },
        data: { cashBalance: { decrement: totalCost } },
      });
    }

    const transaction = await this.prisma.transaction.create({ data: dto });
    await this.handleHoldingAfterTransaction(dto);
    return transaction;
  }

  async updateTransaction(id: number, dto: CreateTransactionDto) {
    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: dto,
    });
    await this.handleHoldingAfterTransaction(dto);
    return transaction;
  }

  async deleteTransaction(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    if (!transaction) throw new NotFoundException('Transaction not found.');

    await this.prisma.transaction.delete({ where: { id } });
    await this.adjustCashBalanceAndHoldingsAfterTransactionDeletion(
      transaction,
    );
  }

  async findAllTransactions() {
    return this.prisma.transaction.findMany();
  }

  async findOneTransaction(id: number) {
    return this.prisma.transaction.findUnique({ where: { id } });
  }

  async handleHoldingAfterTransaction(transaction: CreateTransactionDto) {
    const existingHolding = await this.prisma.holding.findFirst({
      where: { userId: transaction.userId, assetId: transaction.assetId },
    });

    if (transaction.transactionType === 'BUY') {
      if (existingHolding) {
        const newQuantity = existingHolding.quantity + transaction.quantity;
        const totalCost =
          existingHolding.averageBuyPrice * existingHolding.quantity +
          transaction.quantity * transaction.pricePerUnit;
        const newAverageBuyPrice = totalCost / newQuantity;

        await this.prisma.holding.update({
          where: { id: existingHolding.id },
          data: { quantity: newQuantity, averageBuyPrice: newAverageBuyPrice },
        });
      } else {
        await this.prisma.holding.create({
          data: {
            userId: transaction.userId,
            assetId: transaction.assetId,
            quantity: transaction.quantity,
            averageBuyPrice: transaction.pricePerUnit,
          },
        });
      }
    } else if (transaction.transactionType === 'SELL') {
      if (!existingHolding || existingHolding.quantity < transaction.quantity) {
        throw new BadRequestException('Not enough assets to sell.');
      }
      await this.prisma.holding.update({
        where: { id: existingHolding.id },
        data: { quantity: existingHolding.quantity - transaction.quantity },
      });
      // Increase user's cash balance
      await this.prisma.user.update({
        where: { id: transaction.userId },
        data: {
          cashBalance: {
            increment: transaction.quantity * transaction.pricePerUnit,
          },
        },
      });
    }
  }

  async adjustCashBalanceAndHoldingsAfterTransactionDeletion(
    transaction: CreateTransactionDto,
  ) {
    if (transaction.transactionType === 'BUY') {
      // Reverse the cash used for the purchase
      await this.prisma.user.update({
        where: { id: transaction.userId },
        data: {
          cashBalance: {
            increment: transaction.quantity * transaction.pricePerUnit,
          },
        },
      });
    } else if (transaction.transactionType === 'SELL') {
      // Deduct cash received from the sale
      await this.prisma.user.update({
        where: { id: transaction.userId },
        data: {
          cashBalance: {
            decrement: transaction.quantity * transaction.pricePerUnit,
          },
        },
      });
    }
    // Update or delete the holding accordingly
    const existingHolding = await this.prisma.holding.findFirst({
      where: { userId: transaction.userId, assetId: transaction.assetId },
    });
    if (existingHolding) {
      const newQuantity = existingHolding.quantity - transaction.quantity;
      if (newQuantity <= 0) {
        await this.prisma.holding.delete({ where: { id: existingHolding.id } });
      } else {
        await this.prisma.holding.update({
          where: { id: existingHolding.id },
          data: { quantity: newQuantity },
        });
      }
    }
  }
}
