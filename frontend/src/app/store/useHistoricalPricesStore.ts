import create from 'zustand';
import type {HistoricalPrice} from '@/app/types/types';

interface HistoricalPricesState {
  historicalPrices: Record<string, HistoricalPrice[]>;
  setHistoricalPrices: (symbol: string, prices: HistoricalPrice[]) => void;
  historicalPricesLoading: boolean;
  setHistoricalPricesLoading: (loading: boolean) => void;
  fetchedHistoricalPrices: boolean;
  setFetchedHistoricalPrices: (fetched: boolean) => void;
  updatingPrices: boolean;
  setUpdatingPrices: (updating: boolean) => void;
}

export const useHistoricalPricesStore = create<HistoricalPricesState>(
  (set) => ({
    historicalPrices: {},
    setHistoricalPrices: (symbol, prices) =>
      set((state) => ({
        historicalPrices: {
          ...state.historicalPrices,
          [symbol]: prices,
        },
      })),
    historicalPricesLoading: false,
    setHistoricalPricesLoading: (loading) =>
      set({historicalPricesLoading: loading}),
    fetchedHistoricalPrices: false,
    setFetchedHistoricalPrices: (fetched) =>
      set({fetchedHistoricalPrices: fetched}),
    updatingPrices: false,
    setUpdatingPrices: (updating) => set({updatingPrices: updating}),
  }),
);
