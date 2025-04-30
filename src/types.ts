export interface ExchangeResult {
    datasource: string;
    base: string;
    date: string;
    rates: Record<string, number>;
  }
  