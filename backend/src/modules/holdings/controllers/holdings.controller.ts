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
import { CreateHoldingDto } from '../dto/holding.dto';
import { HoldingService } from '../services/holdings.service';

@Controller('holdings')
export class HoldingsController {
  constructor(private holdingService: HoldingService) {}

  @Post()
  create(@Body() createHoldingDto: CreateHoldingDto) {
    return this.holdingService.createHolding(createHoldingDto);
  }

  @Get()
  findAll(@Query('type') type?: string) {
    return this.holdingService.findAllHoldings(type);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.holdingService.findOneHolding(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateHoldingDto: CreateHoldingDto) {
    return this.holdingService.updateHolding(id, updateHoldingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.holdingService.deleteHolding(id);
  }
}
