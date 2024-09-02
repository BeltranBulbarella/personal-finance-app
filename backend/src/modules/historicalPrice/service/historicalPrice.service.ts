import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PrismaService } from '../../../services/prisma/prisma.service';
import redisClient from '../../../services/redis/redis';

@Injectable()
export class HistoricalPriceService {
  private readonly logger = new Logger(HistoricalPriceService.name);
  private readonly apiKeys = [
    process.env.ALPHA_VANTAGE_API_KEY,
    process.env.ALPHA_VANTAGE_API_KEY_2,
    process.env.ALPHA_VANTAGE_API_KEY_3,
    process.env.ALPHA_VANTAGE_API_KEY_4,
    process.env.ALPHA_VANTAGE_API_KEY_5,
  ];

  constructor(private prisma: PrismaService) {}

  async updateMonthlyPricesForStocks() {
    const stocks = await this.prisma.asset.findMany({
      where: { type: 'stock' },
    });

    for (const stock of stocks) {
      await this.fetchAndStoreStockPrice(stock);
    }
  }

  async updateMonthlyPricesForCryptos() {
    const cryptos = await this.prisma.asset.findMany({
      where: { type: 'crypto' },
    });

    for (const crypto of cryptos) {
      await this.fetchAndStoreCryptoPrice(crypto);
    }
  }

  private async fetchAndStoreStockPrice(stock: { id: number; symbol: string }) {
    const cacheKey = `stock:monthly_prices:${stock.symbol}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      this.logger.log(`Using cached data for ${stock.symbol}`);
      return JSON.parse(cachedData);
    }

    for (const apiKey of this.apiKeys) {
      const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY_ADJUSTED&symbol=${stock.symbol}&apikey=${apiKey}`;
      try {
        const response = await axios.get(url);
        const data = response.data['Monthly Adjusted Time Series'];

        if (!data) {
          if (
            response.data.Information &&
            response.data.Information.includes('rate limit')
          ) {
            this.logger.warn(
              `API key ${apiKey} rate limit reached, switching to next key.`,
            );
            continue; // Try next API key
          }
          this.logger.warn(`No data found for symbol: ${stock.symbol}`);
          return;
        }

        const last12Months = Object.keys(data)
          .slice(0, 12)
          .map((date) => ({
            date: new Date(date),
            price: parseFloat(data[date]['5. adjusted close']),
          }));

        // Store in Redis
        await redisClient.set(
          cacheKey,
          JSON.stringify(last12Months),
          'EX',
          60 * 60 * 24 * 30, // Cache for 30 days
        );

        // Store in PostgreSQL
        for (const entry of last12Months) {
          await this.prisma.assetPrice.upsert({
            where: {
              assetId_date: {
                assetId: stock.id,
                date: entry.date,
              },
            },
            update: { price: entry.price },
            create: {
              assetId: stock.id,
              date: entry.date,
              price: entry.price,
            },
          });
        }

        this.logger.log(`Successfully updated prices for ${stock.symbol}`);
        return last12Months;
      } catch (error) {
        this.logger.error(
          `Failed to fetch data for ${stock.symbol} with API key ${apiKey}: ${error.message}`,
        );
      }
    }

    this.logger.error(`All API keys exhausted or failed for ${stock.symbol}`);
    return null;
  }

  private async fetchAndStoreCryptoPrice(crypto: {
    id: number;
    symbol: string;
  }) {
    const cacheKey = `crypto:monthly_prices:${crypto.symbol}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      this.logger.log(`Using cached data for ${crypto.symbol}`);
      return JSON.parse(cachedData);
    }

    for (const apiKey of this.apiKeys) {
      const url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=${crypto.symbol}&market=USD&apikey=${apiKey}`;
      try {
        const response = await axios.get(url);
        const data = response.data['Time Series (Digital Currency Monthly)'];

        if (!data) {
          if (
            response.data.Information &&
            response.data.Information.includes('rate limit')
          ) {
            this.logger.warn(
              `API key ${apiKey} rate limit reached, switching to next key.`,
            );
            continue; // Try next API key
          }
          this.logger.warn(`No data found for symbol: ${crypto.symbol}`);
          return;
        }

        const last12Months = Object.keys(data)
          .slice(0, 12)
          .map((date) => ({
            date: new Date(date),
            price: parseFloat(data[date]['4b. close (USD)']),
          }));

        // Store in Redis
        await redisClient.set(
          cacheKey,
          JSON.stringify(last12Months),
          'EX',
          60 * 60 * 24 * 30, // Cache for 30 days
        );

        // Store in PostgreSQL
        for (const entry of last12Months) {
          await this.prisma.assetPrice.upsert({
            where: {
              assetId_date: {
                assetId: crypto.id,
                date: entry.date,
              },
            },
            update: { price: entry.price },
            create: {
              assetId: crypto.id,
              date: entry.date,
              price: entry.price,
            },
          });
        }

        this.logger.log(`Successfully updated prices for ${crypto.symbol}`);
        return last12Months;
      } catch (error) {
        this.logger.error(
          `Failed to fetch data for ${crypto.symbol} with API key ${apiKey}: ${error.message}`,
        );
      }
    }

    this.logger.error(`All API keys exhausted or failed for ${crypto.symbol}`);
    return null;
  }

  async getMonthlyPrices(symbol: string) {
    const cacheKey = `asset:monthly_prices:${symbol}`;
    const cachedData = await redisClient.get(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const prices = await this.prisma.assetPrice.findMany({
      where: { asset: { symbol } },
      orderBy: { date: 'desc' },
      take: 12, // Get the last 12 months
    });

    return prices;
  }
}
