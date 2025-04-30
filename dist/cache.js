"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCachedRate = getCachedRate;
exports.setCachedRate = setCachedRate;
exports.clearCache = clearCache;
const node_cache_1 = __importDefault(require("node-cache"));
const cache = new node_cache_1.default({ stdTTL: 300 }); // cache expires in 5 minutes
const getCacheKey = (base, date, symbols) => `${base.toUpperCase()}-${date}-${symbols.map(s => s.toUpperCase()).sort().join(',')}`;
function getCachedRate(base, date, symbols) {
    const key = getCacheKey(base, date, symbols);
    const cached = cache.get(key);
    // Safely check that the cached value is a full ExchangeResult
    if (cached &&
        typeof cached === 'object' &&
        'datasource' in cached &&
        'base' in cached &&
        'date' in cached &&
        'rates' in cached) {
        return cached;
    }
    return undefined;
}
function setCachedRate(base, date, symbols, data) {
    cache.set(getCacheKey(base, date, symbols), data);
}
function clearCache() {
    cache.flushAll();
}
