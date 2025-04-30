
export const cache = new Map<string, any>();

export function getCacheKey(base: string, symbols: string[]): string {
  return `${base.toUpperCase()}:${symbols.map(s => s.toUpperCase()).sort().join(',')}`;
}

export function getCachedRate(key: string) {
  return cache.get(key);
}

export function setCachedRate(key: string, value: any) {
  cache.set(key, value);
}

export function clearCache() {
  cache.clear();
}
