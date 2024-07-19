import { ApiProperty } from '@nestjs/swagger';

export class CreateHoldingDto {
  @ApiProperty({ example: 1, description: 'User ID' })
  userId: number;

  @ApiProperty({ example: 1, description: 'Asset ID' })
  assetId: number;

  @ApiProperty({ example: 10, description: 'Quantity of asset' })
  quantity: number;

  @ApiProperty({
    example: 100.5,
    description: 'Average buy price of the asset',
  })
  averageBuyPrice: number;
}

export class UpdateHoldingDto {
  @ApiProperty({
    example: 5,
    description: 'New quantity of asset',
    required: false,
  })
  quantity?: number;

  @ApiProperty({
    example: 150.5,
    description: 'New average buy price of the asset',
    required: false,
  })
  averageBuyPrice?: number;
}

export class EnhancedHoldingDto extends CreateHoldingDto {
  @ApiProperty({
    example: 1500,
    description: 'Current market price of the asset',
  })
  currentPrice: number;

  @ApiProperty({
    example: 500,
    description: 'Profit and loss for this holding',
  })
  pnl: number;
}
