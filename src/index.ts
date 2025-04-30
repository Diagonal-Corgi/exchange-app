import express from 'express';
import { getAverageRates } from './exchange';
import { getMetrics } from './metrics';

const app = express();
const port = process.env.PORT || 3000;

app.get('/exchangeRates/:base', async (req, res) => {
  try {
    const base = req.params.base.toUpperCase();
    const symbolsParam = req.query.symbols as string;
    const date = (req.query.date as string) || 'latest';

    if (!symbolsParam) {
      return res.status(400).json({ error: 'Missing symbols query parameter.' });
    }

    const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase());

    const result = await getAverageRates(base, date, symbols);
    res.json(result);
  } catch (error: any) {
    console.error('Error fetching exchange rates:', error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rates.' });
  }
});

app.get('/metrics', (req, res) => {
  res.json(getMetrics());
});

app.listen(port, () => {
  console.log(`Exchange rate app listening at http://localhost:${port}`);
});
