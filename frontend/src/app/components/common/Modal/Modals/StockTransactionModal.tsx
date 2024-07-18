'use client';
import React, {useEffect} from 'react';
import type {Asset} from '@/app/store/useAssetsStore';
import {AssetType} from '@/app/store/useAssetsStore';
import {useAssetsStore} from '@/app/store/useAssetsStore';
import {Box} from '@mui/material';
import {TransactionModal} from '@/app/components/common/Modal/Modals/TransactionModal';
import {
  type TransactionData,
  useTransactions,
} from '@/app/hooks/useTransactions';

export const StockTransactionModal = ({onClose}: any) => {
  const {assets, fetchAssets, loading} = useAssetsStore();
  const {createTransaction} = useTransactions();

  useEffect(() => {
    if (!assets.length && !loading) {
      fetchAssets();
    }
  }, [assets.length, loading, fetchAssets]);

  const handleSubmit = async (data: TransactionData) => {
    await createTransaction({
      assetId: data.assetId,
      quantity: data.quantity,
      pricePerUnit: data.pricePerUnit,
      transactionType: data.transactionType,
      userId: 1,
      transactionDate: new Date(),
    });
    onClose();
  };

  return (
    <Box>
      <TransactionModal
        onClose={onClose}
        title='Add Stock Transaction'
        assets={assets.filter((asset: Asset) => asset.type === AssetType.Stock)}
        onSubmit={handleSubmit}
      />
    </Box>
  );
};
