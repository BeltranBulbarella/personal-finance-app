'use client';
import React from 'react';
import {cryptoTableColumns} from '@/app/components/ui/Crypto/cryptoTableColumns';
import useCryptoStore from '@/app/store/cryptoStore';
import AssetTypeDashboard from '@/app/components/common/Dashboards/AssetTypeDashboard';

export const CryptoDashboard = () => {
  return (
    <AssetTypeDashboard
      assetType='crypto'
      fetchPrices={useCryptoStore().fetchPrices}
      prices={useCryptoStore().prices}
      tableColumns={cryptoTableColumns}
      priceSymbolPrefix=''
    />
  );
};
