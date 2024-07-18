import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Asset ID' })
  assetId: number;

  @ApiProperty({ example: 10, description: 'Quantity of the transaction' })
  quantity: number;

  @ApiProperty({
    example: 200,
    description: 'Price per unit at the time of transaction',
  })
  pricePerUnit: number;

  @ApiProperty({
    example: 'BUY',
    description: 'Type of transaction (BUY or SELL)',
  })
  transactionType: string;

  @ApiProperty({
    example: '2023-10-01T00:00:00Z',
    description: 'Date and time of the transaction',
  })
  transactionDate: Date;
}
