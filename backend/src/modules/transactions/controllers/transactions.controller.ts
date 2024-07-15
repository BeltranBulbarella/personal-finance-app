import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CreateTransactionDto } from '../dto/transaction.dto';
import { TransactionService } from '../services/transactions.service';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionService.findAllTransactions();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.transactionService.findOneTransaction(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateTransactionDto: CreateTransactionDto) {
    return this.transactionService.updateTransaction(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.transactionService.deleteTransaction(id);
  }
}
