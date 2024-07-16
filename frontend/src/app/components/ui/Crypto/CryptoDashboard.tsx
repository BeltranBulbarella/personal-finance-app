'use client';
import {AdvancedRealTimeChart} from 'react-ts-tradingview-widgets';
import {Box} from '@mui/material';
import CommonTable from '@/app/components/common/Table/CommonTable';

const columns = [
  {id: 'name', label: 'Crypto', minWidth: 170},
  {id: 'quantity', label: 'Quantity', minWidth: 100},
  {
    id: 'currentPrice',
    label: 'Current Price',
    minWidth: 100,
    format: (value: any) => `$${value.toFixed(2)}`,
  },
  {
    id: 'winnings',
    label: 'Winnings',
    minWidth: 100,
    format: (value: any) => `$${value.toFixed(2)}`,
  },
];

const data = [
  {id: 1, name: 'Bitcoin', quantity: 0.5, currentPrice: 50000, winnings: 500},
  // More cryptocurrencies...
];

export const CryptoDashboard = () => {
  return (
    <Box>
      <Box>
        <h1>Crypto</h1>
      </Box>
      {/*<AdvancedRealTimeChart autosize />*/}
      <Box>
        <CommonTable columns={columns} data={data} />
      </Box>
    </Box>
  );
};
