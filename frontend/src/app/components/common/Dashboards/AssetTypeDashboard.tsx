'use client';
import React, {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import CommonTable from '@/app/components/common/Table/CommonTable';
import {useHoldings} from '@/app/hooks/useHoldings';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {AdvancedRealTimeChart} from 'react-ts-tradingview-widgets';
import {
  enhanceHoldings,
  findMostValuedHoldingSymbol,
} from '@/utils/utilFunctions';

interface AssetTypeDashboardProps {
  assetType: string;
  fetchPrices: (symbols: string[]) => Promise<void>;
  prices: Record<string, number | null>;
  tableColumns: any;
  priceSymbolPrefix?: string;
}

export const AssetTypeDashboard = ({
  assetType,
  fetchPrices,
  prices,
  tableColumns,
  priceSymbolPrefix = '',
}: AssetTypeDashboardProps) => {
  const {fetchHoldings} = useHoldings();
  const {holdings, loading: holdingsLoading} = useHoldingsStore();
  const [mostValuedSymbol, setMostValuedSymbol] = useState('');

  useEffect(() => {
    if (!holdings.length) {
      fetchHoldings();
    } else {
      const symbols = holdings
        .filter((h) => h.asset.type === assetType)
        .map((h) => h.asset.symbol);
      fetchPrices(symbols);
    }
  }, [holdings, fetchPrices, assetType]);

  useEffect(() => {
    if (!holdingsLoading && prices) {
      const enhancedAssets = enhanceHoldings(holdings, prices, assetType);
      const symbol = findMostValuedHoldingSymbol(enhancedAssets);
      setMostValuedSymbol(symbol || '');
    }
  }, [prices, holdings, holdingsLoading, assetType]);

  if (holdingsLoading) return <Box>Loading...</Box>;

  return (
    <Box>
      <h1>{`${assetType.charAt(0).toUpperCase() + assetType.slice(1)} Dashboard`}</h1>
      <Box>
        <Box style={{height: '500px', width: '100%'}}>
          {mostValuedSymbol && (
            <AdvancedRealTimeChart
              symbol={`${priceSymbolPrefix}${mostValuedSymbol}`}
              theme='dark'
              autosize
            />
          )}
        </Box>
        <Box sx={{marginTop: '40px'}}>
          <CommonTable
            loading={holdingsLoading}
            columns={tableColumns}
            data={enhanceHoldings(holdings, prices, assetType)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AssetTypeDashboard;
