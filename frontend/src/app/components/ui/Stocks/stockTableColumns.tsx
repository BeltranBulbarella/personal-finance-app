export const stockTableColumns = [
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
    format: (value: {quantity: number}) => value.quantity,
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
    format: (value: {averageBuyPrice: number}) =>
      `$${value.averageBuyPrice.toFixed(2)}`,
  },
  {
    id: 'winnings',
    label: 'PNL',
    minWidth: 100,
    format: (value: {pnl: number}) => (
      <span style={{color: value.pnl >= 0 ? 'green' : 'red'}}>
        {value.pnl.toFixed(2)}
      </span>
    ),
  },
];
