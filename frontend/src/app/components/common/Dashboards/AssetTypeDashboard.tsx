'use client';
import React from 'react';
import {Box} from '@mui/material';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {AdvancedRealTimeChart} from 'react-ts-tradingview-widgets';
import CommonTable from '@/app/components/common/Table/CommonTable';

interface AssetTypeDashboardProps {
  assetType: string;
  tableColumns: any;
  priceSymbolPrefix?: string;
  priceSymbolSuffix?: string;
}

export const AssetTypeDashboard = ({
  assetType,
  tableColumns,
  priceSymbolPrefix = '',
  priceSymbolSuffix = '',
}: AssetTypeDashboardProps) => {
  const {holdings, holdingsLoading} = useHoldingsStore();

  const filteredHoldings = holdings.filter((h) => h.asset.type === assetType);
  const mostValuedSymbol = filteredHoldings.reduce(
    (max, h) => {
      if (!h.totalValue || !max.totalValue) return h;
      if (h.totalValue > max.totalValue) return h;
      return max;
    },
    filteredHoldings[0] || {asset: {symbol: 'BTC'}},
  ).asset.symbol;

  if (holdingsLoading) return <Box>Loading...</Box>;

  return (
    <Box>
      <h1>{`${assetType.charAt(0).toUpperCase() + assetType.slice(1)} Dashboard`}</h1>
      <Box>
        <Box style={{height: '500px', width: '100%'}}>
          {mostValuedSymbol && (
            <AdvancedRealTimeChart
              symbol={`${priceSymbolPrefix}${mostValuedSymbol}${priceSymbolSuffix}`}
              theme='dark'
              autosize
            />
          )}
        </Box>
        <Box sx={{marginTop: '40px'}}>
          <CommonTable
            loading={holdingsLoading}
            columns={tableColumns}
            data={filteredHoldings}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AssetTypeDashboard;
