import axios from 'axios';
import { recordApiCall } from './metrics';
import { ExchangeResult } from './types';

export async function getAverageRates(base: string, symbols: string[]): Promise<ExchangeResult> {
  const [fawazData, frankfurterData] = await Promise.all([
    fetchFawaz(base, symbols),
    fetchFrankfurter(base, symbols)
  ]);

  const rates: Record<string, number> = {};
  const sources = ['Free Currency Rates API', 'Frankfurter API'];

  for (const symbol of symbols) {
    const avg = (fawazData.rates[symbol] + frankfurterData.rates[symbol]) / 2;
    rates[symbol] = avg;
  }

  return {
    datasource: sources.join(', '),
    base,
    rates
  };
}

async function fetchFawaz(base: string, symbols: string[]) {
  recordApiCall('fawaz', 'request');
  const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${base.toLocaleLowerCase()}.json`;
  const res = await axios.get(url);
  recordApiCall('fawaz', 'response');
  
  const rates: Record<string, number> = {};
  for (const symbol of symbols) {
    rates[symbol] = res.data[base.toLowerCase()][symbol.toLowerCase()];
  }

  return { rates };
}

async function fetchFrankfurter(base: string, symbols: string[]) {
  recordApiCall('frankfurter', 'request');
  const url = `https://api.frankfurter.app/latest?from=${base}&to=${symbols.join(',')}`;
  const res = await axios.get(url);
  recordApiCall('frankfurter', 'response');

  return { rates: res.data.rates };
}
