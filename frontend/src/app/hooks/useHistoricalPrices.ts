import axiosInstance from '@/utils/axiosInstance';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';
import {useHistoricalPricesStore} from '@/app/store/useHistoricalPricesStore';

export const useHistoricalPrices = () => {
  const {
    historicalPrices,
    setHistoricalPrices,
    historicalPricesLoading,
    setHistoricalPricesLoading,
    setFetchedHistoricalPrices,
    updatingPrices,
    setUpdatingPrices,
  } = useHistoricalPricesStore();

  const fetchHistoricalPrices = async (
    symbol: string,
    type: 'stock' | 'crypto',
  ) => {
    try {
      if (historicalPricesLoading) return;
      setHistoricalPricesLoading(true);

      const endpoint =
        type === 'stock'
          ? `/historical-prices/stocks/${symbol}/prices`
          : `/historical-prices/cryptos/${symbol}/prices`;
      const response = await axiosInstance.get(endpoint);
      setHistoricalPrices(symbol, response.data);
      setFetchedHistoricalPrices(true);
      setHistoricalPricesLoading(false);
    } catch (error) {
      console.error('Fetching historical prices error:', error);
      setFetchedHistoricalPrices(true);
      setHistoricalPricesLoading(false);
      ErrorToast('Failed to fetch historical prices');
    }
  };

  const updateHistoricalPrices = async () => {
    try {
      if (updatingPrices) return;
      setUpdatingPrices(true);

      await axiosInstance.get('/historical-prices/update-prices');
      setUpdatingPrices(false);
      SuccessToast('Asset prices updated successfully');
    } catch (error) {
      console.error('Updating historical prices error:', error);
      setUpdatingPrices(false);
      ErrorToast('Failed to update historical prices');
    }
  };

  return {
    fetchHistoricalPrices,
    updateHistoricalPrices,
  };
};
