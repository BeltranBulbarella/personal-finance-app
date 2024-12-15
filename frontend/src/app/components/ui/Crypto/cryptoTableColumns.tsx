import {Holding} from '@/app/types/types';

export const cryptoTableColumns = [
  {
    id: 'symbol',
    label: 'Symbol',
    minWidth: 100,
    format: (value: {asset: {symbol: string}}) => value.asset.symbol,
    getSortValue: (row: Holding) => row.asset.symbol.toLowerCase(), // Ensuring case-insensitive sorting
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    format: (value: {asset: {name: string}}) => value.asset.name,
    getSortValue: (row: Holding) => row.asset.name.toLowerCase(), // Ensuring case-insensitive sorting
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100,
    format: (value: {quantity: number}) => {
      if (value.quantity > 0) return value.quantity;
      return '-';
    },
    getSortValue: (row: Holding) => row.quantity,
  },
  {
    id: 'currentPrice',
    label: 'Current Price',
    minWidth: 100,
    format: (value: {currentPrice: number}) =>
      `$${value.currentPrice.toFixed(2)}`,
    getSortValue: (row: Holding) => row.currentPrice || 0,
  },
  {
    id: 'averageBuyPrice',
    label: 'Average Buy Price',
    minWidth: 100,
    format: (value: {averageBuyPrice: number}) => {
      if (value.averageBuyPrice > 0)
        return `$${value.averageBuyPrice.toFixed(2)}`;
      return '-';
    },
    getSortValue: (row: Holding) => row.averageBuyPrice,
  },
  {
    id: 'winnings',
    label: 'Unrealized PNL',
    minWidth: 100,
    format: (value: {pnl: number}) => (
      <span style={{color: value.pnl >= 0 ? 'green' : 'red'}}>
        {value.pnl.toFixed(2)}
      </span>
    ),
    getSortValue: (row: Holding) => row.winnings?.toFixed(2) || 0,
  },
  {
    id: 'moneySpent',
    label: 'Cost/Money Spent',
    minWidth: 100,
    format: (value: {moneySpent: number}) => {
      if (value.moneySpent > 0) return `$${value.moneySpent.toFixed(2)}`;
      return '-';
    },
    getSortValue: (row: Holding) => row.moneySpent || 0,
  },
  {
    id: 'realizedPnL',
    label: 'Realized PNL',
    minWidth: 100,
    format: (value: {realizedPnL: number}) => (
      <span style={{color: value.realizedPnL >= 0 ? 'green' : 'red'}}>
        {value.realizedPnL > 0 ? value.realizedPnL.toFixed(2) : '-'}
      </span>
    ),
    getSortValue: (row: Holding) => row.realizedPnL || 0,
  },
  {
    id: 'platformBought',
    label: 'Platform Bought',
    minWidth: 100,
    format: (value: {platformBought: string}) => value.platformBought || '-',
    getSortValue: (row: Holding) => row.platformBought?.toLowerCase(),
  },
  {
    id: 'platformStored',
    label: 'Platform Stored',
    minWidth: 100,
    format: (value: {platformStored: string}) => value.platformStored || '-',
    getSortValue: (row: Holding) => row.platformStored?.toLowerCase(),
  },
];
