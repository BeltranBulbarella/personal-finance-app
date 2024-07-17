interface Asset {
  id: number;
  name: string;
  symbol: string;
  type: string;
}

interface Holding {
  id: number;
  userId: number;
  assetId: number;
  quantity: number;
  averageBuyPrice: number;
  asset: Asset;
}

interface EnhancedHolding extends Holding {
  currentPrice: number;
  winnings: number;
}

interface Prices {
  [key: string]: number | null;
}

export const enhanceHoldings = (
  holdings: Holding[],
  prices: Prices,
  assetType: string,
): EnhancedHolding[] => {
  return holdings
    .filter((holding) => holding.asset.type === assetType)
    .map((holding) => ({
      ...holding,
      currentPrice: prices[holding.asset.symbol] || 0,
      winnings:
        ((prices[holding.asset.symbol] || 0) - holding.averageBuyPrice) *
        holding.quantity,
    }));
};

export const findMostValuedHoldingSymbol = (
  enhancedHoldings: EnhancedHolding[],
): string | null => {
  if (enhancedHoldings.length === 0) {
    return null;
  }

  const mostValuedHolding = enhancedHoldings.reduce((max, current) => {
    const currentValue = current.currentPrice * current.quantity;
    const maxValue = max.currentPrice * max.quantity;
    return currentValue > maxValue ? current : max;
  });

  return mostValuedHolding.asset.symbol;
};
