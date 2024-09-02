import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateAssetDto, UpdateAssetDto } from '../dto/asset.dto';
import { AssetService } from '../services/assets.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('assets')
@Controller('assets')
export class AssetController {
  constructor(private assetService: AssetService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new asset' })
  @ApiResponse({
    status: 201,
    description: 'The asset has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  create(@Body() createAssetDto: CreateAssetDto) {
    return this.assetService.createAsset(createAssetDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assets or filter by type' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filter assets by type',
  })
  @ApiResponse({
    status: 200,
    description: 'Returned all assets or filtered assets.',
  })
  findAll(@Query('type') type?: string) {
    return this.assetService.findAllAssets(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an asset by id' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({
    status: 200,
    description: 'Returned the asset with the given id.',
  })
  @ApiResponse({ status: 404, description: 'Asset not found.' })
  findOne(@Param('id') id: string) {
    return this.assetService.findOneAsset(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an asset by id' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({
    status: 200,
    description: 'The asset has been successfully updated.',
  })
  update(@Param('id') id: string, @Body() updateAssetDto: UpdateAssetDto) {
    return this.assetService.updateAsset(+id, updateAssetDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an asset' })
  @ApiParam({ name: 'id', description: 'Asset ID' })
  @ApiResponse({
    status: 204,
    description: 'The asset has been successfully deleted.',
  })
  remove(@Param('id') id: string) {
    return this.assetService.deleteAsset(+id);
  }
}
