import { getAverageRates } from '../exchange';

test('fetches average rates for EUR to USD,NZD,GBP', async () => {
    const result = await getAverageRates('EUR', ['USD', 'NZD', 'GBP']);
    console.log(result)
    expect(result.base).toBe('EUR');
    expect(result.rates).toHaveProperty('USD');
    expect(result.rates).toHaveProperty('NZD');
    expect(result.rates).toHaveProperty('GBP');
});
