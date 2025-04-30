# Exchange Rate Averaging API

This application fetches exchange rates from two public APIs and returns an average value for given currency pairs.

## Features
- Fetch from Fawaz and Frankfurter APIs
- Cache repeated queries
- Track metrics per API
- Expose exchange and metric endpoints

## Endpoints
- `/exchangeRates/:base?symbols=USD,NZD`
- `/metrics`

## Setup
```bash
npm install
npm run dev
