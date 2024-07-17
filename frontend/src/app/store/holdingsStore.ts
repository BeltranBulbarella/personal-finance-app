import create from 'zustand';

interface Holding {
  id: number;
  userId: number;
  assetId: number;
  quantity: number;
  averageBuyPrice: number;
  asset: {
    id: number;
    name: string;
    symbol: string;
    type: string;
  };
}

interface HoldingsState {
  holdings: Holding[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setHoldings: (holdings: Holding[]) => void;
  addHolding: (holding: Holding) => void;
  removeHolding: (id: number) => void;
  updateHolding: (id: number, data: Partial<Holding>) => void;
}

export const useHoldingsStore = create<HoldingsState>((set, get) => ({
  holdings: [],
  loading: false,
  setLoading: (loading) => set({loading}),
  setHoldings: (holdings) => set({holdings}),
  addHolding: (holding) =>
    set((state) => ({holdings: [...state.holdings, holding]})),
  removeHolding: (id) =>
    set((state) => ({
      holdings: state.holdings.filter((holding) => holding.id !== id),
    })),
  updateHolding: (id, data) =>
    set((state) => ({
      holdings: state.holdings.map((holding) =>
        holding.id === id ? {...holding, ...data} : holding,
      ),
    })),
}));
