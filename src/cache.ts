import NodeCache from 'node-cache';

export const cache = new NodeCache({ stdTTL: 300 });

export function makeCacheKey(base: string, symbols: string[]): string {
  return `${base}:${symbols.sort().join(',')}`;
}
