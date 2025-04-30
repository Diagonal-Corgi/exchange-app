import NodeCache from 'node-cache';
import { ExchangeResult } from './types';

const cache = new NodeCache({ stdTTL: 300 }); // cache expires in 5 minutes

const getCacheKey = (base: string, date: string, symbols: string[]) =>
  `${base.toUpperCase()}-${date}-${symbols.map(s => s.toUpperCase()).sort().join(',')}`;

export function getCachedRate(base: string, date: string, symbols: string[]): ExchangeResult | undefined {
  const key = getCacheKey(base, date, symbols);
  const cached = cache.get(key);

  // Safely check that the cached value is a full ExchangeResult
  if (
    cached &&
    typeof cached === 'object' &&
    'datasource' in cached &&
    'base' in cached &&
    'date' in cached &&
    'rates' in cached
  ) {
    return cached as ExchangeResult;
  }

  return undefined;
}


export function setCachedRate(base: string, date: string, symbols: string[], data: any) {
  cache.set(getCacheKey(base, date, symbols), data);
}

export function clearCache() {
  cache.flushAll();
}
