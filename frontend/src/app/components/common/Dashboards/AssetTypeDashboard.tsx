'use client';
import React, {useEffect} from 'react';
import {Box, Paper, Typography} from '@mui/material';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {AdvancedRealTimeChart} from 'react-ts-tradingview-widgets';
import CommonTable from '@/app/components/common/Table/CommonTable';
import {useHoldings} from '@/app/hooks/useHoldings';

interface AssetTypeDashboardProps {
  assetType: string;
  tableColumns: any;
  priceSymbolPrefix?: string;
  priceSymbolSuffix?: string;
}

export const AssetTypeDashboard = ({
  assetType,
  tableColumns,
  priceSymbolSuffix,
}: AssetTypeDashboardProps) => {
  const {holdings, holdingsLoading, fetchedHoldings} = useHoldingsStore();
  const {fetchHoldings} = useHoldings();

  useEffect(() => {
    if (!fetchedHoldings) {
      fetchHoldings();
    }
  }, []);

  const filteredHoldings = holdings.filter((h) => h.asset.type === assetType);
  // const mostValuedSymbol =
  //   filteredHoldings.length > 0 ? filteredHoldings[0].asset.symbol : 'BTC';

  const mostValuedSymbol =
    assetType === 'crypto'
      ? 'BTC'
      : filteredHoldings.reduce(
          (max, h) => {
            if (!h.totalValue || !max.totalValue) return h;
            if (h.totalValue > max.totalValue) return h;
            return max;
          },
          filteredHoldings[0] || {asset: {symbol: 'BTC'}},
        ).asset.symbol;

  return (
    <Box>
      <Typography variant='h4' sx={{mb: 3, fontWeight: 'bold'}}>
        {assetType.charAt(0).toUpperCase() + assetType.slice(1)} Dashboard
      </Typography>

      {/* Chart Card */}
      <Paper elevation={3} sx={{p: 3, mb: 4}}>
        <Typography variant='h6' sx={{mb: 2, fontWeight: 'bold'}}>
          {mostValuedSymbol} Price Chart
        </Typography>
        <Box sx={{height: '500px'}}>
          {/*        symbol={`${priceSymbolPrefix}${mostValuedSymbol}${priceSymbolSuffix}`}*/}
          <AdvancedRealTimeChart
            symbol={`${mostValuedSymbol}${priceSymbolSuffix}`}
            theme='dark'
            autosize
          />
        </Box>
      </Paper>
      {/* Holdings Table */}
      <Paper elevation={3} sx={{p: 3}}>
        <Typography variant='h6' sx={{mb: 2, fontWeight: 'bold'}}>
          Holdings
        </Typography>
        <CommonTable
          loading={holdingsLoading}
          columns={tableColumns}
          data={filteredHoldings}
        />
      </Paper>
    </Box>
  );
};

export default AssetTypeDashboard;
