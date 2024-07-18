import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAssetDto {
  @ApiProperty({ description: 'Type of the asset', example: 'stock' })
  @IsNotEmpty()
  @IsString()
  type: string;

  @ApiProperty({ description: 'Symbol of the asset', example: 'AAPL' })
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @ApiProperty({ description: 'Name of the asset', example: 'Apple Inc.' })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateAssetDto {
  @ApiProperty({
    description: 'Updated name of the asset',
    example: 'Apple Inc.',
    required: false,
  })
  name?: string;
}
