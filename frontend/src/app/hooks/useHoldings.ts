import axiosInstance from '@/utils/axiosInstance';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';

export const useHoldings = () => {
  const {
    balances,
    setBalances,
    balancesLoading,
    setBalancesLoading,
    setFetchedBalances,
    setHoldings,
    holdingsLoading,
    setFetchedHoldings,
    setHoldingsLoading,
  } = useHoldingsStore();

  const fetchHoldings = async () => {
    try {
      if (holdingsLoading) return;
      setHoldingsLoading(true);

      const response = await axiosInstance.get('/holdings/with-prices/1');
      setHoldings(response.data);
      setFetchedHoldings(true);
      setHoldingsLoading(false);
    } catch (error) {
      console.error('Fetching holdings error:', error);
      setFetchedHoldings(true);
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
      setFetchedBalances(true);
      setBalancesLoading(false);
    }
  };

  const addCash = async (userId: number, amount: number) => {
    try {
      const response = await axiosInstance.post('/holdings/add-cash', {
        userId,
        amount,
      });
      setBalances({
        ...balances,
        cash: response.data.cashBalance,
      });
      SuccessToast('Cash added successfully');
      return response.data;
    } catch (error) {
      console.error('Add cash error:', error);
      ErrorToast('Failed to add cash');
    }
  };
  const removeCash = async (userId: number, amount: number) => {
    try {
      const response = await axiosInstance.post('/holdings/remove-cash', {
        userId,
        amount,
      });
      setBalances({
        ...balances,
        cash: response.data.cashBalance,
      });
      SuccessToast('Cash removed successfully');
      return response.data;
    } catch (error) {
      console.error('Remove cash error:', error);
      ErrorToast('Failed to remove cash');
    }
  };

  return {
    fetchHoldings,
    fetchBalances,
    addCash,
    removeCash,
  };
};
