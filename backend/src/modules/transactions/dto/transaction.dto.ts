export class CreateTransactionDto {
  userId: number;
  assetId: number;
  quantity: number;
  pricePerUnit: number;
  transactionType: string;
  transactionDate: Date;
}
