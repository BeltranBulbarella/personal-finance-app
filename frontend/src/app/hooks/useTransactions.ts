import axiosInstance from '@/utils/axiosInstance';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';
import {useHoldings} from '@/app/hooks/useHoldings';

export interface TransactionData {
  userId: number;
  assetId: number;
  quantity: number;
  moneySpent: number;
  pricePerUnit: number;
  transactionType: 'BUY' | 'SELL';
  transactionDate: Date;
}

export const useTransactions = () => {
  const {fetchHoldings, fetchBalances} = useHoldings();
  const createTransaction = async (transactionData: TransactionData) => {
    console.log('transactionData', transactionData);
    try {
      const response = await axiosInstance.post(
        '/transactions',
        transactionData,
      );
      SuccessToast('Transaction created successfully');
      await fetchHoldings();
      await fetchBalances();
      return response.data;
    } catch (error: any) {
      console.error('Create transaction error:', error);
      ErrorToast(error.response.data.message);
    }
  };

  const deleteTransaction = async (id: number) => {
    try {
      await axiosInstance.delete(`/transactions/${id}`);
      SuccessToast('Transaction deleted successfully');
    } catch (error) {
      console.error('Delete transaction error:', error);
      ErrorToast('Failed to delete transaction');
    }
  };

  return {
    createTransaction,
    deleteTransaction,
  };
};
