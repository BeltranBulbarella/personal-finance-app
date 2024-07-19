'use client';
import React from 'react';
import {cryptoTableColumns} from '@/app/components/ui/Crypto/cryptoTableColumns';
import AssetTypeDashboard from '@/app/components/common/Dashboards/AssetTypeDashboard';

export const CryptoDashboard = () => {
  return (
    <AssetTypeDashboard
      assetType='crypto'
      tableColumns={cryptoTableColumns}
      priceSymbolSuffix='USDT'
    />
  );
};
