import create from 'zustand';
import axios from 'axios';

interface CryptoState {
  prices: Record<string, number | null>;
  setPrice: (symbol: string, price: number | null) => void;
  fetchPrices: (symbols: string[]) => Promise<void>;
}

export const useCryptoStore = create<CryptoState>((set, get) => ({
  prices: {},
  setPrice: (symbol, price) => {
    set((state) => {
      const updatedPrices = {...state.prices, [symbol]: price};
      return {prices: updatedPrices};
    });
  },

  fetchPrices: async (symbols) => {
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=`;
    const uniqueSymbols = Array.from(new Set(symbols));

    const fetchPrice = async (symbol: string) => {
      try {
        if (symbol === 'USDT' || symbol === 'USDC') {
          set((state) => ({prices: {...state.prices, [symbol]: 1}}));
          return;
        }

        const response = await axios.get(`${url}${symbol}USDT`);
        const price = parseFloat(response.data.price);
        set((state) => ({
          prices: {...state.prices, [symbol]: price},
        }));
      } catch (error) {
        set((state) => ({prices: {...state.prices, [symbol]: null}}));
      }
    };

    await Promise.all(uniqueSymbols.map(fetchPrice));
  },
}));
