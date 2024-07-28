import create from 'zustand';
import {Asset} from '@/app/types/types';

interface AssetState {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
  assetsLoading: boolean;
  setAssetsLoading: (value: boolean) => void;
  fetchedAssets: boolean;
  setFetchedAssets: (value: boolean) => void;
}

export const useAssetsStore = create<AssetState>((set, get) => ({
  assets: [],
  setAssets: (assets: Asset[]) => set({assets}),
  assetsLoading: false,
  setAssetsLoading: (value: boolean) => set({assetsLoading: value}),
  fetchedAssets: false,
  setFetchedAssets: (value: boolean) => set({fetchedAssets: value}),
}));
