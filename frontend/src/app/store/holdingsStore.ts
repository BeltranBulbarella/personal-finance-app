import create from 'zustand';
import type {Balances, Holding} from '@/app/types/types';

interface HoldingsState {
  balances: Balances;
  setBalances: (balances: Balances) => void;
  holdings: Holding[];
  setHoldings: (holdings: Holding[]) => void;
  fetchedHoldings: boolean;
  setFetchedHoldings: (fetched: boolean) => void;
  holdingsLoading: boolean;
  setHoldingsLoading: (loading: boolean) => void;
}

export const useHoldingsStore = create<HoldingsState>((set) => ({
  balances: {cash: 0, crypto: 0, stock: 0},
  setBalances: (balances) => set({balances}),
  holdings: [],
  setHoldings: (holdings) => set({holdings}),
  holdingsLoading: false,
  setHoldingsLoading: (loading) => set({holdingsLoading: loading}),
  fetchedHoldings: false,
  setFetchedHoldings: (fetched) => set({fetchedHoldings: fetched}),
}));
