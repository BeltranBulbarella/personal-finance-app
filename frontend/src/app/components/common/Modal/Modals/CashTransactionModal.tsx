'use client';
import React from 'react';
import {Box} from '@mui/material';
import {useHoldings} from '@/app/hooks/useHoldings';
import {TransactionModal} from '@/app/components/common/Modal/Modals/TransactionModal';
import {transactionTypes} from '@/app/types/types';

export const CashTransactionModal = ({onClose}: any) => {
  const {addCash, removeCash} = useHoldings();

  const handleModalSubmit = async (data: any) => {
    if (data.transactionType === transactionTypes.BUY) {
      await addCash(1, data.quantity);
    } else {
      await removeCash(1, data.quantity);
    }
  };

  return (
    <Box>
      <TransactionModal
        onClose={onClose}
        title='Cash Transaction'
        onSubmit={handleModalSubmit}
      />
    </Box>
  );
};
