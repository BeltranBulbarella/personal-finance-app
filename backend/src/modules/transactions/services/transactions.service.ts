import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import {PrismaService} from '../../../services/prisma/prisma.service';
import {CreateTransactionDto} from '../dto/transaction.dto';

@Injectable()
export class TransactionService {
    constructor(private prisma: PrismaService) {
    }

    async createTransaction(dto: CreateTransactionDto) {
        if (!dto.userId) {
            throw new BadRequestException('User ID must be provided');
        }

        const user = await this.prisma.user.findUnique({
            where: {id: dto.userId},
        });

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        // Calculate quantity if only money spent is provided and vice versa
        if (dto.moneySpent && (!dto.quantity || dto.quantity === 0)) {
            dto.quantity = dto.moneySpent / dto.pricePerUnit;
        } else if (dto.quantity && (!dto.moneySpent || dto.moneySpent === 0)) {
            dto.moneySpent = dto.quantity * dto.pricePerUnit;
        }

        if (!dto.quantity || !dto.moneySpent) {
            throw new BadRequestException('Either quantity or money spent must be provided.');
        }

        if (dto.quantity && dto.moneySpent && dto.pricePerUnit > 0) {
            const calculatedMoneySpent = dto.quantity * dto.pricePerUnit;
            if (Math.abs(calculatedMoneySpent - dto.moneySpent) > 0.01) {
                throw new BadRequestException('Provided quantity and money spent do not align with the price per unit.');
            }
        }

        // Check cash balance for buy transactions
        const totalCost = dto.moneySpent; // Now using moneySpent directly
        if (user.cashBalance < totalCost) {
            throw new BadRequestException('Insufficient cash balance.');
        }

        // Update user's cash balance
        const cashBalanceUpdate = dto.transactionType === 'BUY' ? {decrement: totalCost} : {increment: totalCost};
        await this.prisma.user.update({
            where: {id: dto.userId},
            data: {cashBalance: cashBalanceUpdate}
        });

        const transaction = await this.prisma.transaction.create({ data: dto });
        await this.handleHoldingAfterTransaction(dto);
        return transaction;
    }

    async updateTransaction(id: number, dto: CreateTransactionDto) {
        const transaction = await this.prisma.transaction.update({
            where: {id},
            data: dto,
        });
        await this.handleHoldingAfterTransaction(dto);
        return transaction;
    }

    async deleteTransaction(id: number) {
        const transaction = await this.prisma.transaction.findUnique({
            where: {id},
        });
        if (!transaction) throw new NotFoundException('Transaction not found.');

        await this.prisma.transaction.delete({where: {id}});
        await this.adjustCashBalanceAndHoldingsAfterTransactionDeletion(
            transaction,
        );
    }

    async findAllTransactions() {
        return this.prisma.transaction.findMany();
    }

    async findOneTransaction(id: number) {
        return this.prisma.transaction.findUnique({where: {id}});
    }

    async handleHoldingAfterTransaction(transaction: CreateTransactionDto) {
        const existingHolding = await this.prisma.holding.findFirst({
            where: { userId: transaction.userId, assetId: transaction.assetId },
        });

        if (transaction.transactionType === 'BUY') {
            const additionalCost = transaction.moneySpent ?? (transaction.quantity * transaction.pricePerUnit);
            const additionalQuantity = transaction.quantity;

            if (existingHolding) {
                // Update existing holding
                const newQuantity = existingHolding.quantity + additionalQuantity;
                const newTotalMoneySpent = existingHolding.moneySpent + additionalCost;
                const newAverageBuyPrice = newTotalMoneySpent / newQuantity;

                await this.prisma.holding.update({
                    where: { id: existingHolding.id },
                    data: {
                        quantity: newQuantity,
                        moneySpent: newTotalMoneySpent,
                        averageBuyPrice: newAverageBuyPrice,
                    },
                });
            } else {
                // Create new holding
                await this.prisma.holding.create({
                    data: {
                        userId: transaction.userId,
                        assetId: transaction.assetId,
                        quantity: additionalQuantity,
                        moneySpent: additionalCost,
                        averageBuyPrice: transaction.pricePerUnit, // Initial average price is the transaction price per unit
                    },
                });
            }
        } else if (transaction.transactionType === 'SELL') {
            if (!existingHolding || existingHolding.quantity < transaction.quantity) {
                throw new BadRequestException('Not enough assets to sell.');
            }

            // Calculate new values after selling
            const remainingQuantity = existingHolding.quantity - transaction.quantity;
            const moneyGained = transaction.quantity * transaction.pricePerUnit;
            const newTotalMoneySpent = existingHolding.moneySpent - (moneyGained * (existingHolding.moneySpent / (existingHolding.quantity * existingHolding.averageBuyPrice)));

            await this.prisma.holding.update({
                where: { id: existingHolding.id },
                data: {
                    quantity: remainingQuantity,
                    moneySpent: newTotalMoneySpent > 0 ? newTotalMoneySpent : 0, // Ensure no negative values
                },
            });

            // Update user's cash balance after selling
            await this.prisma.user.update({
                where: { id: transaction.userId },
                data: {
                    cashBalance: {
                        increment: moneyGained,
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
                where: {id: transaction.userId},
                data: {
                    cashBalance: {
                        increment: transaction.quantity * transaction.pricePerUnit,
                    },
                },
            });
        } else if (transaction.transactionType === 'SELL') {
            // Deduct cash received from the sale
            await this.prisma.user.update({
                where: {id: transaction.userId},
                data: {
                    cashBalance: {
                        decrement: transaction.quantity * transaction.pricePerUnit,
                    },
                },
            });
        }
        // Update or delete the holding accordingly
        const existingHolding = await this.prisma.holding.findFirst({
            where: {userId: transaction.userId, assetId: transaction.assetId},
        });
        if (existingHolding) {
            const newQuantity = existingHolding.quantity - transaction.quantity;
            if (newQuantity <= 0) {
                await this.prisma.holding.delete({where: {id: existingHolding.id}});
            } else {
                await this.prisma.holding.update({
                    where: {id: existingHolding.id},
                    data: {quantity: newQuantity},
                });
            }
        }
    }
}
