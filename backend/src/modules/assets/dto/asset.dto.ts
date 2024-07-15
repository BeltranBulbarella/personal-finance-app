import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAssetDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateAssetDto {
  name?: string;
}
