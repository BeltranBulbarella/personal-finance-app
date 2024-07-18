import { Injectable } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from '../dto/asset.dto';
import { PrismaService } from '../../../services/prisma/prisma.service';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  async createAsset(dto: CreateAssetDto) {
    return this.prisma.asset.create({ data: dto });
  }

  async updateAsset(id: number, dto: UpdateAssetDto) {
    return this.prisma.asset.update({ where: { id }, data: dto });
  }

  async deleteAsset(id: number) {
    return this.prisma.asset.delete({ where: { id } });
  }

  async findAllAssets(type?: string) {
    if (type) {
      return this.prisma.asset.findMany({
        where: { type },
      });
    } else {
      return this.prisma.asset.findMany();
    }
  }

  async findOneAsset(id: number) {
    return this.prisma.asset.findUnique({ where: { id } });
  }
}
