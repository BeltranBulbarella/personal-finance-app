import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTransactionDto } from '../dto/transaction.dto';
import { TransactionService } from '../services/transactions.service';

@ApiTags('transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new transaction' })
  @ApiResponse({
    status: 201,
    description: 'Transaction created successfully.',
  })
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.createTransaction(createTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({
    status: 200,
    description: 'Transactions retrieved successfully.',
  })
  findAll() {
    return this.transactionService.findAllTransactions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a transaction by ID' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction retrieved successfully.',
  })
  findOne(@Param('id') id: number) {
    return this.transactionService.findOneTransaction(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({
    status: 200,
    description: 'Transaction updated successfully.',
  })
  update(
    @Param('id') id: number,
    @Body() updateTransactionDto: CreateTransactionDto,
  ) {
    return this.transactionService.updateTransaction(id, updateTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a transaction' })
  @ApiParam({ name: 'id', description: 'Transaction ID' })
  @ApiResponse({
    status: 204,
    description: 'Transaction deleted successfully.',
  })
  remove(@Param('id') id: number) {
    return this.transactionService.deleteTransaction(id);
  }
}
