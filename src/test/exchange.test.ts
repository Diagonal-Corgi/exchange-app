import { getAverageRates } from '../exchange';
import { clearCache } from '../cache';

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

describe('Exchange rate cache tests', () => {
    beforeEach(() => {
      clearCache(); // Ensure cache is cleared before each test
    });
  
    test('uses cache for repeated request', async () => {
      // First request (fetches data from APIs)
      const firstResult = await getAverageRates('EUR', '2024-03-02', ['USD', 'NZD']);
      console.log(firstResult)
  
      // Second request (should use cached data)
      const secondResult = await getAverageRates('EUR', '2024-03-02', ['USD', 'NZD']);
      expect(secondResult).toEqual(firstResult);  // Cached result should be equal to the first
      console.log(secondResult)
  
    });
  });
