import axiosInstance from '@/utils/axiosInstance';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';
import {useHoldingsStore} from '@/app/store/holdingsStore';

export const useHoldings = () => {
  const {
    balances,
    setBalances,
    setHoldings,
    holdingsLoading,
    setHoldingsLoading,
  } = useHoldingsStore();

  const fetchHoldings = async () => {
    try {
      if (holdingsLoading) return;
      setHoldingsLoading(true);

      const response = await axiosInstance.get('/holdings');
      setHoldings(response.data);
      setHoldingsLoading(false);
    } catch (error) {
      console.error('Fetching holdings error:', error);
      setHoldingsLoading(false);
    }
  };

  const addCash = async (userId: number, amount: number) => {
    try {
      const response = await axiosInstance.post('/holdings/add-cash', {
        userId,
        amount,
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
      SuccessToast('Cash removed successfully');
      return response.data;
    } catch (error) {
      console.error('Remove cash error:', error);
      ErrorToast('Failed to remove cash');
    }
  };

  const getCashBalance = async (userId: number) => {
    try {
      const response = await axiosInstance.get(`/holdings/get-cash/${userId}`);
      setBalances({
        cash: response.data,
        crypto: balances.crypto,
        stock: balances.stock,
      });
    } catch (error) {
      ErrorToast('Failed to retrieve cash balance');
    }
  };

  return {
    fetchHoldings,
    addCash,
    removeCash,
    getCashBalance,
  };
};
