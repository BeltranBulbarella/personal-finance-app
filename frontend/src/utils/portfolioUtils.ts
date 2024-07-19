import {useStockStore} from '@/app/store/useStockStore';
import {useHoldingsStore} from '@/app/store/holdingsStore';
import {useCryptoStore} from '@/app/store/cryptoStore';
import type {Balances, Holding, Prices} from '@/app/types/types';

/**
 * Enhances holdings by incorporating live market prices and calculates additional financial metrics.
 */
export const enhanceHoldings = (
  holdings: Holding[],
  prices: Prices,
): Holding[] => {
  return holdings.map((holding) => {
    const currentPrice = prices[holding.asset.symbol] ?? 0;
    return {
      ...holding,
      currentPrice,
      totalValue: currentPrice * holding.quantity,
      winnings: (currentPrice - holding.averageBuyPrice) * holding.quantity,
    };
  });
};

/**
 * Fetches prices for specified asset types and updates holdings with enhanced data.
 */
export async function updateAssetValues(
  assetType: 'crypto' | 'stock',
): Promise<void> {
  const {setHoldings, holdings} = useHoldingsStore.getState();
  const store =
    assetType === 'crypto'
      ? useCryptoStore.getState()
      : useStockStore.getState();

  if (!holdings.length) return;

  const symbols = holdings
    .filter((holding) => holding.asset.type === assetType)
    .map((holding) => holding.asset.symbol);

  await store.fetchPrices(symbols);
  const updatedStore =
    assetType === 'crypto'
      ? useCryptoStore.getState()
      : useStockStore.getState();

  const enhancedHoldings = enhanceHoldings(holdings, updatedStore.prices);
  setHoldings(enhancedHoldings);
  updateBalances();
}

/**
 * Updates balances based on the latest holdings data.
 */
export function updateBalances(): void {
  const {holdings, setBalances, balances} = useHoldingsStore.getState();
  const newBalances = holdings.reduce(
    (acc, holding) => {
      const assetType = holding.asset.type as keyof typeof acc;
      if (holding.totalValue) {
        acc[assetType] = acc[assetType] + holding.totalValue;
      }
      return acc;
    },
    {
      crypto: balances.crypto,
      stock: balances.stock,
      cash: balances.cash,
    } as Balances,
  );

  setBalances(newBalances);
}
