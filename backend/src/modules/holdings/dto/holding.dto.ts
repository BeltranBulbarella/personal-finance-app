export class CreateHoldingDto {
  userId: number;
  assetId: number;
  quantity: number;
  averageBuyPrice: number;
}

export class UpdateHoldingDto {
  quantity?: number;
  averageBuyPrice?: number;
}

