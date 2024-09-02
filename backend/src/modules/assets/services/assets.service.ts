import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from '../dto/asset.dto';
import { PrismaService } from '../../../services/prisma/prisma.service';

@Injectable()
export class AssetService {
  constructor(private prisma: PrismaService) {}

  async createAsset(dto: CreateAssetDto) {
    console.log('Service: Creating asset with data:', dto);
    return this.prisma.asset.create({ data: dto });
  }

  async updateAsset(id: number, dto: UpdateAssetDto) {
    console.log('Service: Updating asset with id:', id, 'and data:', dto);
    return this.prisma.asset.update({ where: { id }, data: dto });
  }

  async deleteAsset(id: number) {
    console.log('Service: Deleting asset with id:', id);
    return this.prisma.asset.delete({ where: { id } });
  }

  async findAllAssets(type?: string) {
    console.log('Service: Finding all assets with type:', type);
    if (type) {
      return this.prisma.asset.findMany({
        where: { type },
      });
    } else {
      return this.prisma.asset.findMany();
    }
  }

  async findOneAsset(id: number) {
    if (isNaN(id)) {
      console.log('Invalid ID provided:', id);
      throw new BadRequestException('Invalid ID');
    }
    console.log('Service: Fetching asset with id:', id);
    return this.prisma.asset.findUnique({ where: { id } });
  }
}
