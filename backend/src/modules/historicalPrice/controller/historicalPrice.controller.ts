import { Controller, Get, Param } from '@nestjs/common';
import { HistoricalPriceService } from '../service/historicalPrice.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('historical-prices')
@Controller('historical-prices')
export class HistoricalPriceController {
  constructor(
    private readonly historicalPriceService: HistoricalPriceService,
  ) {}

  @Get('update-prices')
  @ApiOperation({
    summary: 'Update monthly prices for all stocks and cryptocurrencies',
  })
  @ApiResponse({
    status: 200,
    description: 'Prices updated successfully.',
  })
  async updateAllAssetPrices() {
    await this.historicalPriceService.updateMonthlyPricesForStocks();
    await this.historicalPriceService.updateMonthlyPricesForCryptos();
    return { message: 'Asset prices updated successfully' };
  }

  @Get('stocks/:symbol/prices')
  @ApiOperation({ summary: 'Get the last 12 months of prices for a stock' })
  @ApiParam({ name: 'symbol', description: 'The symbol of the stock' })
  @ApiResponse({
    status: 200,
    description: 'The stock prices have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Stock not found.' })
  async getStockPrices(@Param('symbol') symbol: string) {
    return this.historicalPriceService.getMonthlyPrices(symbol);
  }

  @Get('cryptos/:symbol/prices')
  @ApiOperation({
    summary: 'Get the last 12 months of prices for a cryptocurrency',
  })
  @ApiParam({ name: 'symbol', description: 'The symbol of the cryptocurrency' })
  @ApiResponse({
    status: 200,
    description: 'The cryptocurrency prices have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'Cryptocurrency not found.' })
  async getCryptoPrices(@Param('symbol') symbol: string) {
    return this.historicalPriceService.getMonthlyPrices(symbol);
  }
}
