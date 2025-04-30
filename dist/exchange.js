"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAverageRates = getAverageRates;
const axios_1 = __importDefault(require("axios"));
const cache_1 = require("./cache");
const metrics_1 = require("./metrics");
async function getAverageRates(base, date, symbols) {
    const cached = (0, cache_1.getCachedRate)(base, date, symbols);
    if (cached)
        return cached;
    const [fawazData, frankfurterData] = await Promise.all([
        fetchFawaz(base, date, symbols),
        fetchFrankfurter(base, date, symbols)
    ]);
    const rates = {};
    for (const symbol of symbols) {
        const avg = (fawazData.rates[symbol] + frankfurterData.rates[symbol]) / 2;
        rates[symbol] = avg;
    }
    const result = {
        datasource: 'Free Currency Rates API, Frankfurter API',
        base,
        date,
        rates
    };
    (0, cache_1.setCachedRate)(base, date, symbols, result);
    return result;
}
async function fetchFawaz(base, date, symbols) {
    (0, metrics_1.recordApiCall)('fawaz', 'request');
    const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${date}/v1/currencies/${base.toLocaleLowerCase()}.json`;
    const res = await axios_1.default.get(url);
    (0, metrics_1.recordApiCall)('fawaz', 'response');
    const rates = {};
    for (const symbol of symbols) {
        rates[symbol] = res.data[base.toLowerCase()][symbol.toLowerCase()];
    }
    return { rates };
}
async function fetchFrankfurter(base, date, symbols) {
    (0, metrics_1.recordApiCall)('frankfurter', 'request');
    const url = `https://api.frankfurter.app/${date}?from=${base}&to=${symbols.join(',')}`;
    const res = await axios_1.default.get(url);
    (0, metrics_1.recordApiCall)('frankfurter', 'response');
    return { rates: res.data.rates };
}
