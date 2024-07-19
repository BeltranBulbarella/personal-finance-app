import axiosInstance from '@/utils/axiosInstance';
import {useHoldingsStore} from '@/app/store/holdingsStore';

export const useHoldings = () => {
  const {
    setBalances,
    balancesLoading,
    setBalancesLoading,
    setFetchedBalances,
    setHoldings,
    holdingsLoading,
    setHoldingsLoading,
  } = useHoldingsStore();

  const fetchHoldings = async () => {
    try {
      if (holdingsLoading) return;
      setHoldingsLoading(true);

      const response = await axiosInstance.get('/holdings/with-prices/1');
      setHoldings(response.data);
      setHoldingsLoading(false);
    } catch (error) {
      console.error('Fetching holdings error:', error);
      setHoldingsLoading(false);
    }
  };

  const fetchBalances = async () => {
    try {
      if (balancesLoading) return;
      setBalancesLoading(true);

      const response = await axiosInstance.get('/balances/1');
      setBalances(response.data);
      setFetchedBalances(true);
      setBalancesLoading(false);
    } catch (error) {
      console.error('Fetching holdings error:', error);
      setBalancesLoading(false);
    }
  };

  return {
    fetchHoldings,
    fetchBalances,
  };
};
