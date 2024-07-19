import create from 'zustand';
import type {Balances, Holding} from '@/app/types/types';

interface HoldingsState {
  // balances
  balances: Balances;
  setBalances: (balances: Balances) => void;
  balancesLoading: boolean;
  setBalancesLoading: (loading: boolean) => void;
  fetchedBalances: boolean;
  setFetchedBalances: (fetched: boolean) => void;

  // holdings
  holdings: Holding[];
  setHoldings: (holdings: Holding[]) => void;
  fetchedHoldings: boolean;
  setFetchedHoldings: (fetched: boolean) => void;
  holdingsLoading: boolean;
  setHoldingsLoading: (loading: boolean) => void;
}

export const useHoldingsStore = create<HoldingsState>((set) => ({
  // balances
  balances: {cash: 0, crypto: 0, stock: 0},
  setBalances: (balances) => set({balances}),
  balancesLoading: false,
  setBalancesLoading: (loading) => set({balancesLoading: loading}),
  fetchedBalances: false,
  setFetchedBalances: (fetched) => set({fetchedBalances: fetched}),
  // holdings
  holdings: [],
  setHoldings: (holdings) => set({holdings}),
  holdingsLoading: false,
  setHoldingsLoading: (loading) => set({holdingsLoading: loading}),
  fetchedHoldings: false,
  setFetchedHoldings: (fetched) => set({fetchedHoldings: fetched}),
}));
