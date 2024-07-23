import create from 'zustand';

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
    setAssets: (assets: Asset[]) => void;
    assetsLoading: boolean
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
