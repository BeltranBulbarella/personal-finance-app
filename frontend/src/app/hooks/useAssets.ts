import {useAssetsStore} from '@/app/store/useAssetsStore';
import axiosInstance from '@/utils/axiosInstance';
import {ErrorToast, SuccessToast} from '@/app/components/common/Toast/Toast';
import {Asset} from '@/app/types/types';

export const useAssets = () => {
  const {setAssets, assetsLoading, setAssetsLoading, setFetchedAssets} =
    useAssetsStore();

  const fetchAssets = async () => {
    if (assetsLoading) return;
    setAssetsLoading(true);

    try {
      const response = await axiosInstance.get('/assets');
      setAssets(response.data);
      setFetchedAssets(true);
    } catch (error) {
      console.error('Failed to fetch assets:', error);
      setFetchedAssets(true);
      ErrorToast('Failed to fetch assets');
      setAssets([]);
    } finally {
      setAssetsLoading(false);
    }
  };

  const createAsset = async (data: Asset) => {
    try {
      const response = await axiosInstance.post('/assets', data);
      setFetchedAssets(false);
      SuccessToast('Asset created successfully');
    } catch (error) {
      console.log('Failed to create asset:', error);
      ErrorToast('Failed to create asset');
    }
  };

  return {
    fetchAssets,
    createAsset,
  };
};
