import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateHoldingDto,
  EnhancedHoldingDto,
  UpdateHoldingDto,
} from '../dto/holding.dto';
import { PrismaService } from '../../../services/prisma/prisma.service';
import axios from 'axios';

@Injectable()
export class HoldingService {
  constructor(private prisma: PrismaService) {}

  async createHolding(dto: CreateHoldingDto) {
    return this.prisma.holding.create({ data: dto });
  }

  async updateHolding(id: number, dto: UpdateHoldingDto) {
    return this.prisma.holding.update({
      where: { id },
      data: dto,
    });
  }

  async deleteHolding(id: number) {
    return this.prisma.holding.delete({ where: { id } });
  }

  async findAllHoldings(type?: string) {
    if (type) {
      return this.prisma.holding.findMany({
        where: {
          asset: {
            type: type,
          },
        },
        include: {
          asset: true,
        },
      });
    } else {
      return this.prisma.holding.findMany({
        include: {
          asset: true,
        },
      });
    }
  }

  async findOneHolding(id: number) {
    return this.prisma.holding.findUnique({ where: { id } });
  }

  async adjustCashBalance(userId: number, amount: number) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const newBalance = user.cashBalance + amount;
    if (newBalance < 0)
      throw new BadRequestException('Insufficient cash balance');

    return this.prisma.user.update({
      where: { id: userId },
      data: { cashBalance: newBalance },
    });
  }

  async getCashBalance(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { cashBalance: true },
    });
    if (!user) throw new NotFoundException('User not found');

    return user.cashBalance;
  }

  async getCurrentPrice(symbol: string, type: string): Promise<number> {
    if (type === 'crypto') {
      return this.fetchCryptoPrice(symbol);
    } else if (type === 'stock') {
      return this.fetchStockPrice(symbol);
    }
    return 0; // Default return if type is not supported
  }

  private async fetchCryptoPrice(symbol: string): Promise<number> {
    if (symbol === 'USDT' || symbol === 'USDC') {
      return 1;
    } else {
      const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}USDT`;
      try {
        const response = await axios.get(url);
        return parseFloat(response.data.price);
      } catch (error) {
        console.error(`Failed to fetch price for ${symbol}:`, error);
        return 0; // Fallback price
      }
    }
  }

  private async fetchStockPrice(symbol: string): Promise<number> {
    const apiKey = process.env.TWELVEDATA_API_KEY;
    const url = `https://api.twelvedata.com/price?symbol=${symbol}&apikey=${apiKey}`;
    try {
      const response = await axios.get(url);
      return parseFloat(response.data.price);
    } catch (error) {
      console.error(`Failed to fetch price for ${symbol}:`, error);
      return 0; // Fallback price
    }
  }

  async calculateTotalAssetValues(
    userId: number,
  ): Promise<{ crypto: number; stock: number; cash: number }> {
    const holdings = await this.prisma.holding.findMany({
      where: { userId },
      include: { asset: true },
    });

    let totalCrypto = 0;
    let totalStock = 0;

    for (const holding of holdings) {
      const price = await this.getCurrentPrice(
        holding.asset.symbol,
        holding.asset.type,
      );
      const totalValue = holding.quantity * price;
      if (holding.asset.type === 'crypto') {
        totalCrypto += totalValue;
      } else if (holding.asset.type === 'stock') {
        totalStock += totalValue;
      }
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { cashBalance: true },
    });
    return {
      crypto: totalCrypto,
      stock: totalStock,
      cash: user?.cashBalance ?? 0,
    };
  }

  async getHoldingsWithPrices(userId: number): Promise<EnhancedHoldingDto[]> {
    const holdings = await this.prisma.holding.findMany({
      where: { userId },
      include: { asset: true },
    });

    return Promise.all(
      holdings.map(async (holding) => {
        const currentPrice = await this.getCurrentPrice(
          holding.asset.symbol,
          holding.asset.type,
        );
        const pnl = (currentPrice - holding.averageBuyPrice) * holding.quantity;
        return {
          ...holding,
          currentPrice,
          pnl,
        };
      }),
    );
  }
}
