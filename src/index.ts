import express from 'express';
import { getAverageRates } from './exchange';
import { cache, makeCacheKey } from './cache';
import { getMetrics } from './metrics';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/exchangeRates/:base', async (req, res) => {
  const base = req.params.base.toUpperCase();
  const symbols = req.query.symbols?.toString().split(',') || [];

  const cacheKey = makeCacheKey(base, symbols);
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  try {
    const result = await getAverageRates(base, symbols);
    cache.set(cacheKey, result);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

app.get('/metrics', (req, res) => {
  res.json(getMetrics());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
