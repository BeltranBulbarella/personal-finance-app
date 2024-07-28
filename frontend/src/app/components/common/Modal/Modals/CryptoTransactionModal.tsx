'use client';
import React, {useEffect} from 'react';
import {useAssetsStore} from '@/app/store/useAssetsStore';
import {Box} from '@mui/material';
import {TransactionModal} from '@/app/components/common/Modal/GenericModals/TransactionModal';
import type {TransactionData} from '@/app/hooks/useTransactions';
import {useTransactions} from '@/app/hooks/useTransactions';
import {useAssets} from '@/app/hooks/useAssets';
import {Asset, AssetTypes} from '@/app/types/types';
import {ErrorToast} from '@/app/components/common/Toast/Toast';
import useAuthStore from '@/app/store/authStore';

export const CryptoTransactionModal = ({onClose}: any) => {
  const {assets, assetsLoading, fetchedAssets} = useAssetsStore();
  const {fetchAssets} = useAssets();
  const {createTransaction} = useTransactions();
  const {user} = useAuthStore();

  useEffect(() => {
    if (!fetchedAssets && !assetsLoading) {
      fetchAssets();
    }
  }, []);

  const handleSubmit = async (data: TransactionData) => {
    if (!user) {
      ErrorToast('User not found');
      return;
    }
    await createTransaction({
      assetId: data.assetId,
      quantity: data.quantity,
      moneySpent: data.moneySpent,
      pricePerUnit: data.pricePerUnit,
      transactionType: data.transactionType,
      userId: user?.id,
      transactionDate: new Date(),
    });
    onClose();
  };

  return (
    <Box>
      <TransactionModal
        onClose={onClose}
        title='Add Crypto Transaction'
        assets={assets.filter(
          (asset: Asset) => asset.type === AssetTypes.CRYPTO,
        )}
        onSubmit={handleSubmit}
        type={AssetTypes.CRYPTO}
      />
    </Box>
  );
};
