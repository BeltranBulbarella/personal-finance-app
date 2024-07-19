import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../services/prisma/prisma.service';
import { HoldingService } from '../../holdings/services/holdings.service';

@Injectable()
export class BalanceService {
  constructor(
    private prisma: PrismaService,
    private holdingService: HoldingService,
  ) {}

  async getUserBalances(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        Holdings: {
          include: {
            asset: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const balances = {
      cash: user.cashBalance,
      stock: 0,
      crypto: 0,
    };

    for (const holding of user.Holdings) {
      const currentPrice = await this.holdingService.getCurrentPrice(
        holding.asset.symbol,
        holding.asset.type,
      );
      if (holding.asset.type === 'crypto') {
        balances.crypto += currentPrice * holding.quantity;
      } else if (holding.asset.type === 'stock') {
        balances.stock += currentPrice * holding.quantity;
      }
    }

    return balances;
  }
}
