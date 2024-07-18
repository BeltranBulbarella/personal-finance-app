'use client';
import {Box} from '@mui/material';
import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import useAuthStore from '@/app/store/authStore';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {useHoldings} from '@/app/hooks/useHoldings';

export const Dashboard = () => {
  const {user} = useAuthStore();
  const {cashBalance} = useHoldingsStore();
  console.log('u', user, 'h', cashBalance);
  const {getCashBalance} = useHoldings();

  useEffect(() => {
    getCashBalance(1);
  }, []);
  return (
    <>
      <Box>
        <Button variant='contained' color='primary'>
          Hello World
        </Button>
      </Box>
    </>
  );
};
