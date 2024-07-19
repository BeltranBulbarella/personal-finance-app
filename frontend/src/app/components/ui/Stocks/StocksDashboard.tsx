'use client';
import AssetTypeDashboard from '@/app/components/common/Dashboards/AssetTypeDashboard';
import {stockTableColumns} from '@/app/components/ui/Stocks/stockTableColumns';

export const StocksDashboard = () => {
  return (
    <AssetTypeDashboard
      assetType='stock'
      tableColumns={stockTableColumns}
      priceSymbolPrefix=''
    />
  );
};
