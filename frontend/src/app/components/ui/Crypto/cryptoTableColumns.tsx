export const cryptoTableColumns = [
  {
    id: 'symbol',
    label: 'Symbol',
    minWidth: 100,
    format: (value: {asset: {symbol: string}}) => value.asset.symbol,
  },
  {
    id: 'name',
    label: 'Name',
    minWidth: 100,
    format: (value: {asset: {name: string}}) => value.asset.name,
  },
  {
    id: 'quantity',
    label: 'Quantity',
    minWidth: 100,
    format: (value: {quantity: number}) => {
      if (value.quantity > 0) return value.quantity;
      return '-';
    },
  },
  {
    id: 'currentPrice',
    label: 'Current Price',
    minWidth: 100,
    format: (value: {currentPrice: number}) =>
      `$${value.currentPrice.toFixed(2)}`,
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
  },
  {
    id: 'winnings',
    label: 'Unrealized PNL',
    minWidth: 100,
    format: (value: {pnl: number}) => (
      <span style={{color: value.pnl >= 0 ? 'green' : 'red'}}>
        {value.pnl > 0 ? value.pnl.toFixed(2) : '-'}
      </span>
    ),
  },
  {
    id: 'moneySpent',
    label: 'Cost/Money spent',
    minWidth: 100,
    format: (value: {moneySpent: number}) => {
      if (value.moneySpent > 0) return `$${value.moneySpent.toFixed(2)}`;
      return '-';
    },
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
  },
  {
    id: 'platformBought',
    label: 'Platform Bought',
    minWidth: 100,
    format: (value: {platformBought: string}) => value.platformBought || '-',
  },
  {
    id: 'platformStored',
    label: 'Platform Stored',
    minWidth: 100,
    format: (value: {platformStored: string}) => value.platformStored || '-',
  },
];
