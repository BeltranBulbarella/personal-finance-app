'use client';
import React, {useEffect} from 'react';
import type {Asset} from '@/app/store/useAssetsStore';
import {AssetType} from '@/app/store/useAssetsStore';
import {useAssetsStore} from '@/app/store/useAssetsStore';
import {Box} from '@mui/material';
import {TransactionModal} from '@/app/components/common/Modal/TransactionModal';

export const StockTransactionModal = ({onClose}: any) => {
  const {assets, fetchAssets, loading} = useAssetsStore();

  useEffect(() => {
    if (!assets.length && !loading) {
      fetchAssets();
    }
  }, [assets.length, loading, fetchAssets]);

  return (
    <Box>
      <TransactionModal
        onClose={onClose}
        title='Add Stock Transaction'
        assets={assets.filter((asset: Asset) => asset.type === AssetType.Stock)}
      />
    </Box>
  );
};
