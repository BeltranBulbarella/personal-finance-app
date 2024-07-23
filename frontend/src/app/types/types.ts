export enum transactionTypes {
  BUY = 'BUY',
  SELL = 'SELL',
}

export enum AssetTypes {
  CRYPTO = 'crypto',
  STOCK = 'stock',
  CASH = 'cash',
}

export interface Asset {
  id: number;
  name: string;
  symbol: string;
  type: string;
}

export interface Holding {
  id: number;
  userId: number;
  assetId: number;
  quantity: number;
  averageBuyPrice: number;
  asset: Asset;
  currentPrice?: number;
  totalValue?: number;
  winnings?: number;
}

export interface Balances {
  cash: number;
  crypto: number;
  stock: number;

  [key: string]: number;
}

export interface Prices {
  [key: string]: number | null;
}
