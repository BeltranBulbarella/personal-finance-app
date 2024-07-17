import create from 'zustand';
import axios from 'axios';

interface StockInfo {
  symbol: string;
  price: number | null;
}

interface StockState {
  prices: Record<string, number | null>;
  setPrice: (symbol: string, price: number | null) => void;
  fetchPrices: (symbols: string[]) => Promise<void>;
}

export const useStockStore = create<StockState>((set, get) => ({
  prices: {},
  setPrice: (symbol, price) =>
    set((state) => ({prices: {...state.prices, [symbol]: price}})),
  fetchPrices: async (symbols) => {
    const apiKey = process.env.NEXT_PUBLIC_TWELVEDATA_API_KEY;
    const endpoint = 'https://api.twelvedata.com/price';
    await Promise.all(
      symbols.map(async (symbol) => {
        try {
          const params = {
            symbol: symbol,
            apikey: apiKey,
          };
          const response = await axios.get(endpoint, {params});
          get().setPrice(symbol, parseFloat(response.data.price));
        } catch (error) {
          console.error(`Failed to fetch price for ${symbol}`, error);
          get().setPrice(symbol, null);
        }
      }),
    );
  },
}));
