'use client';
import React from 'react';
import {Box} from '@mui/material';
import {useHoldings} from '@/app/hooks/useHoldings';
import {TransactionModal} from '@/app/components/common/Modal/Modals/TransactionModal';
import {AssetTypes, transactionTypes} from '@/app/types/types';
import useAuthStore from '@/app/store/authStore';
import {ErrorToast} from '@/app/components/common/Toast/Toast';

export const CashTransactionModal = ({onClose}: any) => {
  const {addCash, removeCash} = useHoldings();
  const {user} = useAuthStore();

  const handleModalSubmit = async (data: any) => {
    if (!user) {
      ErrorToast('User not found');
      return;
    }
    if (data.transactionType === transactionTypes.BUY) {
      await addCash(user?.id, data.quantity);
    } else {
      await removeCash(user?.id, data.quantity);
    }
  };

  return (
    <Box>
      <TransactionModal
        onClose={onClose}
        title='Cash Transaction'
        onSubmit={handleModalSubmit}
        type={AssetTypes.CASH}
      />
    </Box>
  );
};
