'use client';
import AssetTypeDashboard from '@/app/components/common/Dashboards/AssetTypeDashboard';
import {useStockStore} from '@/app/store/useStockStore';
import {stockTableColumns} from '@/app/components/ui/Dashboard/stockTableColumns';

export const StocksDashboard = () => {
  return (
    <AssetTypeDashboard
      assetType='stock'
      fetchPrices={useStockStore().fetchPrices}
      prices={useStockStore().prices}
      tableColumns={stockTableColumns}
      priceSymbolPrefix=''
    />
  );
};
