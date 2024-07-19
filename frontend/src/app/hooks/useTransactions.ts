import axiosInstance from '@/utils/axiosInstance';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';
import {useHoldings} from '@/app/hooks/useHoldings';

export interface TransactionData {
  userId: number;
  assetId: number;
  quantity: number;
  pricePerUnit: number;
  transactionType: 'BUY' | 'SELL';
  transactionDate: Date;
}

export const useTransactions = () => {
  const {fetchHoldings} = useHoldings();
  const createTransaction = async (transactionData: TransactionData) => {
    console.log('transactionData', transactionData);
    try {
      const response = await axiosInstance.post(
        '/transactions',
        transactionData,
      );
      SuccessToast('Transaction created successfully');
      await fetchHoldings();
      return response.data;
    } catch (error: any) {
      console.error('Create transaction error:', error);
      ErrorToast(error.response.data.message);
    }
  };

  const updateTransaction = async (
    id: number,
    transactionData: TransactionData,
  ) => {
    try {
      const response = await axiosInstance.put(
        `/transactions/${id}`,
        transactionData,
      );
      SuccessToast('Transaction updated successfully');
      return response.data;
    } catch (error) {
      console.error('Update transaction error:', error);
      ErrorToast('Failed to update transaction');
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
    updateTransaction,
    deleteTransaction,
  };
};
