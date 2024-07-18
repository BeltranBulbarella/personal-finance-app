import create from 'zustand';
import axiosInstance from '@/utils/axiosInstance';

export interface Asset {
  id: number;
  name: string;
  symbol: string;
  type: AssetType;
}

export enum AssetType {
  Stock = 'stock',
  Crypto = 'crypto',
}

interface AssetState {
  assets: Asset[];
  loading: boolean;
  fetchAssets: (type?: string) => Promise<void>;
}

export const useAssetsStore = create<AssetState>((set, get) => ({
  assets: [],
  loading: false,

  fetchAssets: async () => {
    set({loading: true});
    try {
      const url = '/assets';
      const response = await axiosInstance.get(url);
      set({assets: response.data, loading: false});
    } catch (error) {
      console.error(`Failed to fetch assets:`, error);
      set({assets: [], loading: false});
    }
  },
}));
