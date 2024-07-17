import axiosInstance from '@/utils/axiosInstance';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';
import {useHoldingsStore} from '@/app/store/holdingsStore';

interface CreateHoldingDto {
  userId: number;
  assetId: number;
  quantity: number;
  averageBuyPrice: number;
}

interface UpdateHoldingDto {
  quantity?: number;
  averageBuyPrice?: number;
}

export const useHoldings = () => {
  const {setHoldings, addHolding, removeHolding, updateHolding, setLoading} =
    useHoldingsStore();

  const fetchHoldings = async () => {
    try {
      if (useHoldingsStore.getState().loading) return;
      setLoading(true);

      const url = `/holdings`;
      const response = await axiosInstance.get(url);
      setHoldings(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Fetching holdings error:', error);
      setLoading(false);
    }
  };

  const createHolding = async (data: CreateHoldingDto) => {
    try {
      const response = await axiosInstance.post('/holdings', data);
      addHolding(response.data);
      SuccessToast('Holding created successfully');
    } catch (error) {
      console.error('Create holding error:', error);
      ErrorToast('Failed to create holding');
    }
  };

  const deleteHolding = async (id: number) => {
    try {
      await axiosInstance.delete(`/holdings/${id}`);
      removeHolding(id);
      SuccessToast('Holding deleted successfully');
    } catch (error) {
      console.error('Delete holding error:', error);
      ErrorToast('Failed to delete holding');
    }
  };

  const updateHoldingData = async (id: number, data: UpdateHoldingDto) => {
    try {
      await axiosInstance.put(`/holdings/${id}`, data);
      updateHolding(id, data);
      SuccessToast('Holding updated successfully');
    } catch (error) {
      console.error('Update holding error:', error);
      ErrorToast('Failed to update holding');
    }
  };

  return {
    fetchHoldings,
    createHolding,
    deleteHolding,
    updateHoldingData,
  };
};
