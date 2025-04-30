"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exchange_1 = require("./exchange");
const metrics_1 = require("./metrics");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/exchangeRates/:base', async (req, res) => {
    try {
        const base = req.params.base.toUpperCase();
        const symbolsParam = req.query.symbols;
        const date = req.query.date || 'latest';
        if (!symbolsParam) {
            return res.status(400).json({ error: 'Missing symbols query parameter.' });
        }
        const symbols = symbolsParam.split(',').map(s => s.trim().toUpperCase());
        const result = await (0, exchange_1.getAverageRates)(base, date, symbols);
        res.json(result);
    }
    catch (error) {
        console.error('Error fetching exchange rates:', error.message);
        res.status(500).json({ error: 'Failed to fetch exchange rates.' });
    }
});
app.get('/metrics', (req, res) => {
    res.json((0, metrics_1.getMetrics)());
});
app.listen(port, () => {
    console.log(`Exchange rate app listening at http://localhost:${port}`);
});
