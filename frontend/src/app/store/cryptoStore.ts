import create from 'zustand';
import axios from 'axios';

interface CryptoInfo {
  symbol: string;
  price: number | null;
}

interface CryptoState {
  prices: Record<string, number | null>;
  setPrice: (symbol: string, price: number | null) => void;
  fetchPrices: (symbols: string[]) => Promise<void>;
}

const useCryptoStore = create<CryptoState>((set, get) => ({
  prices: {},
  setPrice: (symbol, price) =>
    set((state) => ({prices: {...state.prices, [symbol]: price}})),
  fetchPrices: async (symbols) => {
    const uniqueSymbols = Array.from(new Set(symbols));
    const url = `https://api.binance.com/api/v3/ticker/price?symbol=`;
    await Promise.all(
      uniqueSymbols.map(async (symbol) => {
        try {
          if (symbol === 'USDT' || symbol === 'USDC') {
            const response = '1';
            get().setPrice(symbol, parseFloat(response));
          } else {
            const response = await axios.get(url + symbol + 'USDT');
            get().setPrice(symbol, parseFloat(response.data.price));
          }
        } catch (error) {
          console.error(`Failed to fetch price for ${symbol}`, error);
          get().setPrice(symbol, null);
        }
      }),
    );
  },
}));

export default useCryptoStore;
