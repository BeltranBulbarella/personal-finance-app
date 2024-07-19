import { Controller, Get, Param } from '@nestjs/common';
import { BalanceService } from '../services/balance.service';

@Controller('balances')
export class BalanceController {
  constructor(private readonly balanceService: BalanceService) {}

  @Get(':userId')
  async getUserBalances(@Param('userId') userId: string) {
    return await this.balanceService.getUserBalances(+userId);
  }
}
