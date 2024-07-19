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
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateHoldingDto, UpdateHoldingDto } from '../dto/holding.dto';
import { HoldingService } from '../services/holdings.service';

@ApiTags('holdings')
@Controller('holdings')
export class HoldingsController {
  constructor(private holdingService: HoldingService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new holding' })
  @ApiResponse({ status: 201, description: 'Holding created successfully.' })
  create(@Body() createHoldingDto: CreateHoldingDto) {
    return this.holdingService.createHolding(createHoldingDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all holdings or filter by type' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filter holdings by asset type',
  })
  @ApiResponse({ status: 200, description: 'Holdings retrieved successfully.' })
  findAll(@Query('type') type?: string) {
    return this.holdingService.findAllHoldings(type);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific holding by ID' })
  @ApiParam({ name: 'id', description: 'Holding ID' })
  @ApiResponse({ status: 200, description: 'Holding retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Holding not found.' })
  findOne(@Param('id') id: number) {
    return this.holdingService.findOneHolding(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a holding' })
  @ApiParam({ name: 'id', description: 'Holding ID' })
  @ApiResponse({ status: 200, description: 'Holding updated successfully.' })
  update(@Param('id') id: number, @Body() updateHoldingDto: UpdateHoldingDto) {
    return this.holdingService.updateHolding(id, updateHoldingDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a holding' })
  @ApiParam({ name: 'id', description: 'Holding ID' })
  @ApiResponse({ status: 204, description: 'Holding deleted successfully.' })
  remove(@Param('id') id: number) {
    return this.holdingService.deleteHolding(id);
  }

  @Post('add-cash')
  @ApiOperation({ summary: 'Add cash to user balance' })
  @ApiResponse({ status: 200, description: 'Cash added successfully' })
  addCash(@Body() { userId, amount }: { userId: number; amount: number }) {
    return this.holdingService.adjustCashBalance(userId, amount);
  }

  @Post('remove-cash')
  @ApiOperation({ summary: 'Remove cash from user balance' })
  @ApiResponse({ status: 200, description: 'Cash removed successfully' })
  removeCash(@Body() { userId, amount }: { userId: number; amount: number }) {
    return this.holdingService.adjustCashBalance(userId, -amount);
  }

  @Get('get-cash/:userId')
  @ApiOperation({ summary: 'Get cash balance of a user' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiResponse({
    status: 200,
    description: 'Cash balance retrieved successfully',
  })
  getCash(@Param('userId') userId: string) {
    return this.holdingService.getCashBalance(parseInt(userId));
  }

  @Get('with-prices/:userId')
  @ApiOperation({ summary: 'Get holdings with current prices and PNL' })
  @ApiResponse({
    status: 200,
    description: 'Holdings with prices and PNL retrieved successfully.',
  })
  async getHoldingsWithPrices(@Param('userId') userId: string) {
    return this.holdingService.getHoldingsWithPrices(+userId);
  }
}
