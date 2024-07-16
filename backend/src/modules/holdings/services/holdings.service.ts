import { Injectable } from '@nestjs/common';
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
      data: dto
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
}
