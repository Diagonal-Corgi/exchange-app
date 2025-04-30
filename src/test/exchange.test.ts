import { getAverageRates } from '../exchange';
import { clearCache, getCachedRate } from '../cache';

describe('Exchange rate tests', () => {
    test('fetches average rates for EUR to USD,NZD,GBP', async () => {
        const result = await getAverageRates('EUR', 'latest', ['USD', 'NZD', 'GBP']);
        console.log(result)
        expect(result.base).toBe('EUR');
        expect(result.rates).toHaveProperty('USD');
        expect(result.rates).toHaveProperty('NZD');
        expect(result.rates).toHaveProperty('GBP');
    });

    test('fetches average rates for EUR to USD,NZD,GBP', async () => {
        const result = await getAverageRates('EUR', 'latest', ['USD', 'NZD', 'GBP']);
        console.log(result)
        expect(result.base).toBe('EUR');
        expect(result.rates).toHaveProperty('USD');
        expect(result.rates).toHaveProperty('NZD');
        expect(result.rates).toHaveProperty('GBP');
    });
});
describe('Exchange rate caching with node-cache', () => {
    beforeEach(() => {
      clearCache(); // Ensure clean cache before each test
    });
  
    test('returns cached result on repeated call', async () => {
      const base = 'EUR';
      const date = 'latest';
      const symbols = ['USD', 'NZD'];
  
      // First call — should fetch from APIs and cache the result
      const first = await getAverageRates(base, date, symbols);
  
      // Second call — should return from cache
      const second = await getAverageRates(base, date, symbols);

      // Same object shape, values should match
      expect(second).toEqual(first);
  
      // Optional: simulate a delay and re-check cache hasn't expired
      await new Promise(resolve => setTimeout(resolve, 100)); // small delay
      const third = await getAverageRates(base, date, symbols);
      expect(third).toEqual(first);
    });
  });
