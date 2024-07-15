import { Module } from '@nestjs/common';
import { AssetController } from './controllers/assets.controller';
import { AssetService } from './services/assets.service';
import { PrismaService } from '../../services/prisma/prisma.service';

@Module({
  controllers: [AssetController],
  providers: [AssetService, PrismaService],
})
export class AssetsModule {}
