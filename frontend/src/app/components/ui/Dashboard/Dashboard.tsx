'use client';
import {Box} from '@mui/material';
import React, {useEffect} from 'react';
import useAuthStore from '@/app/store/authStore';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {useHoldings} from '@/app/hooks/useHoldings';
import {PortfolioCard} from '@/app/components/common/Card/PortfolioCard';
import {roundTo} from '@/utils/numberUtils';

export const Dashboard = () => {
  const {user} = useAuthStore();
  const {fetchedHoldings, balances, fetchedBalances} = useHoldingsStore();
  const {fetchBalances, fetchHoldings} = useHoldings();

  useEffect(() => {
    if (!fetchedBalances && user) {
      fetchBalances();
    }
    if (!fetchedHoldings && user) {
      fetchHoldings();
    }
  }, []);

  return (
    <>
      <Box display='flex' justifyContent='space-around' flexWrap='wrap'>
        <PortfolioCard
          title='Total Portfolio Value'
          amount={`$${roundTo(balances.cash + balances.crypto + balances.stock)}`}
          percentageChange='+5.2% from last month'
        />
        <PortfolioCard
          title='Stocks'
          amount={`$${roundTo(balances.stock)}`}
          percentageChange='+3.8% from last month'
        />
        <PortfolioCard
          title='Crypto'
          amount={`$${roundTo(balances.crypto)}`}
          percentageChange='+12.4% from last month'
        />
        <PortfolioCard
          title='Cash'
          amount={`$${roundTo(balances.cash)}`}
          percentageChange='+1.2% from last month'
        />
      </Box>
    </>
  );
};
