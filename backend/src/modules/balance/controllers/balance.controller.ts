import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from '../services/balance.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('balances')
@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':userId')
  @ApiOperation({ summary: 'Get balances for a user' })
  @ApiParam({ name: 'userId', description: 'The ID of the user' })
  @ApiResponse({
    status: 200,
    description: 'The user balances have been successfully retrieved.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUserBalances(@Param('userId') userId: string) {
    return await this.balanceService.getUserBalances(+userId);
  }
}
