'use client';
import React, {useEffect} from 'react';
import {Box} from '@mui/material';
import CommonTable from '@/app/components/common/Table/CommonTable';
import {useHoldings} from '@/app/hooks/useHoldings';
import {cryptoTableColumns} from '@/app/components/ui/Crypto/cryptoTableColumns';
import useCryptoStore from '@/app/store/cryptoStore';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {AdvancedRealTimeChart} from 'react-ts-tradingview-widgets';

export const CryptoDashboard = () => {
  const {fetchCryptoHoldings} = useHoldings();
  const {holdings, loading: holdingsLoading} = useHoldingsStore();
  const {fetchPrices, prices} = useCryptoStore();

  useEffect(() => {
    if (!holdings.length) {
      fetchCryptoHoldings();
    } else {
      const symbols = holdings.map((holding) => holding.asset.symbol);
      fetchPrices(symbols);
    }
  }, [holdings]);

  const enhancedHoldings = holdings.map((holding) => ({
    ...holding,
    currentPrice: prices[holding.asset.symbol] || 0,
    winnings:
      ((prices[holding.asset.symbol] || 0) - holding.averageBuyPrice) *
      holding.quantity,
  }));

  if (holdingsLoading) return <Box>Loading...</Box>;

  return (
    <Box>
      <h1>Crypto Dashboard</h1>
      <Box>
        <Box style={{height: '500px', width: '100%'}}>
          <AdvancedRealTimeChart symbol='BTCUSDT' theme='dark' autosize />
        </Box>
        <Box
          sx={{
            marginTop: '40px',
          }}
        >
          <CommonTable
            loading={holdingsLoading}
            columns={cryptoTableColumns}
            data={enhancedHoldings}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default CryptoDashboard;
