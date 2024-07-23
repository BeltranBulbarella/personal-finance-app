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
import {useAssets} from "@/app/hooks/useAssets";

export const StockTransactionModal = ({onClose}: any) => {
  const {assets,assetsLoading, fetchedAssets} = useAssetsStore();
  const {fetchAssets} = useAssets();
  const {createTransaction} = useTransactions();

  useEffect(() => {
    if (!fetchedAssets && !assetsLoading) {
      fetchAssets();
    }
  }, []);

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
