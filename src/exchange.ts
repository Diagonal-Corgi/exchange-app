import axios from 'axios';
import { getCachedRate, setCachedRate } from './cache';
import { recordApiCall } from './metrics';
import { ExchangeResult } from './types';

export async function getAverageRates(base: string, date: string, symbols: string[]): Promise<ExchangeResult> {
  const cached = getCachedRate(base, date, symbols);
  if (cached) return cached;

  const [fawazData, frankfurterData] = await Promise.all([
    fetchFawaz(base, date, symbols),
    fetchFrankfurter(base, date, symbols)
  ]);

  const rates: Record<string, number> = {};
  for (const symbol of symbols) {
    const avg = (fawazData.rates[symbol] + frankfurterData.rates[symbol]) / 2;
    rates[symbol] = avg;
  }

  const result: ExchangeResult = {
    datasource: 'Free Currency Rates API, Frankfurter API',
    base,
    date,
    rates
  };

  setCachedRate(base, date, symbols, result);
  return result;
}

async function fetchFawaz(base: string, date: string, symbols: string[]) {
  recordApiCall('fawaz', 'request');
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${base.toLocaleLowerCase()}.json`;
  const res = await axios.get(url);
  recordApiCall('fawaz', 'response');
  
  const rates: Record<string, number> = {};
  for (const symbol of symbols) {
    rates[symbol] = res.data[base.toLowerCase()][symbol.toLowerCase()];
  }

  return { rates };
}

async function fetchFrankfurter(base: string, date: string, symbols: string[]) {
  recordApiCall('frankfurter', 'request');
  const url = `https://api.frankfurter.app/${date}?from=${base}&to=${symbols.join(',')}`;
  const res = await axios.get(url);
  recordApiCall('frankfurter', 'response');

  return { rates: res.data.rates };
}
