import { ApiProperty } from '@nestjs/swagger';
import {IsDate, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateIf} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTransactionDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ example: 1, description: 'Asset ID' })
  @IsNumber()
  @IsNotEmpty()
  assetId: number;

  @ApiProperty({ example: 10, description: 'Quantity of the transaction' })
  @IsNumber()
  @IsOptional()
  @ValidateIf(o => !o.moneySpent && o.moneySpent !== 0)
  quantity?: number;

  @ApiProperty({ example: 60000, description: 'Price per unit at the time of transaction' })
  @IsNumber()
  @IsNotEmpty()
  pricePerUnit: number;

  @ApiProperty({ example: 800, description: 'Money spent on the transaction', required: false })
  @IsNumber()
  @IsOptional()
  @ValidateIf(o => !o.quantity && o.quantity !== 0)
  moneySpent?: number;

  @ApiProperty({
    example: 'BUY',
    description: 'Type of transaction (BUY or SELL)',
  })
  @IsString()
  @IsNotEmpty()
  transactionType: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Date and time of the transaction',
  })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  transactionDate: Date;
}
