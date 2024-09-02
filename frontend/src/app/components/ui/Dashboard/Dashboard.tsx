'use client';
import {Box} from '@mui/material';
import React, {useEffect} from 'react';
import useAuthStore from '@/app/store/authStore';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {useHoldings} from '@/app/hooks/useHoldings';
import {PortfolioCard} from '@/app/components/common/Card/PortfolioCard';
import {roundTo} from '@/utils/numberUtils';
import {useHistoricalPrices} from '@/app/hooks/useHistoricalPrices';
import {useHistoricalPricesStore} from '@/app/store/useHistoricalPricesStore';

export const Dashboard = () => {
  const {user} = useAuthStore();
  const {fetchedHoldings, balances, fetchedBalances, balancesLoading} =
    useHoldingsStore();
  const {fetchBalances, fetchHoldings} = useHoldings();
  const {fetchHistoricalPrices, updateHistoricalPrices} = useHistoricalPrices();
  const {historicalPrices} = useHistoricalPricesStore();

  useEffect(() => {
    if (!fetchedBalances && user) {
      fetchBalances();
    }
    if (!fetchedHoldings && user) {
      fetchHoldings();
    }
    updateHistoricalPrices().then(() => {
      fetchHistoricalPrices('AAPL', 'stock'); // Fetch stock prices
      fetchHistoricalPrices('MSFT', 'stock'); // Fetch stock prices
      fetchHistoricalPrices('BTC', 'crypto'); // Fetch crypto prices
    });
  }, []);

  console.log(historicalPrices);

  return (
    <>
      <Box display='flex' justifyContent='space-around' flexWrap='wrap'>
        <PortfolioCard
          title='Total Portfolio Value'
          amount={`$${roundTo(balances.cash + balances.crypto + balances.stock)}`}
          percentageChange='+5.2% from last month'
          loading={balancesLoading}
        />
        <PortfolioCard
          title='Stocks'
          amount={`$${roundTo(balances.stock)}`}
          percentageChange='+3.8% from last month'
          loading={balancesLoading}
        />
        <PortfolioCard
          title='Crypto'
          amount={`$${roundTo(balances.crypto)}`}
          percentageChange='+12.4% from last month'
          loading={balancesLoading}
        />
        <PortfolioCard
          title='Cash'
          amount={`$${roundTo(balances.cash)}`}
          percentageChange='+1.2% from last month'
          loading={balancesLoading}
        />
      </Box>
    </>
  );
};
