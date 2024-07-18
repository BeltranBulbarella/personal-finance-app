import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateHoldingDto, UpdateHoldingDto } from '../dto/holding.dto';
import { PrismaService } from '../../../services/prisma/prisma.service';

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
}
