import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from '../dto/asset.dto';
import { AssetService } from '../services/assets.service';

@Controller('assets')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Post()
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto);
  }

  @Get()
  findAll() {
    return this.assetService.findAllAssets();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.assetService.findOneAsset(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.updateAsset(+id, updateAssetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.assetService.deleteAsset(+id);
  }
}
