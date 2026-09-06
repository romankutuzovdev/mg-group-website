export const FX_TRANSFER_MARKUP = 0.02;
const DEFAULT_MARKET_RATE = 1.27;

export type FxRateInfo = {
  /** Мировой курс GBP→USD */
  marketRate: number;
  /** Курс для расчёта: market + 0.02 на перевод */
  rate: number;
  source: string;
};

function round4(value: number): number {
  return Math.round(value * 10000) / 10000;
}

export function applyFxMarkup(marketRate: number): number {
  return round4(marketRate + FX_TRANSFER_MARKUP);
}

export const DEFAULT_FX: FxRateInfo = {
  marketRate: DEFAULT_MARKET_RATE,
  rate: applyFxMarkup(DEFAULT_MARKET_RATE),
  source: "default",
};

/** Client-safe FX fetch (Frankfurter), no Next.js cache options. */
export async function fetchFxRateGbpUsd(): Promise<FxRateInfo> {
  try {
    const res = await fetch("https://api.frankfurter.app/latest?from=GBP&to=USD");
    if (!res.ok) throw new Error(`FX API ${res.status}`);
    const data = (await res.json()) as { rates?: { USD?: number } };
    const rate = data.rates?.USD;
    if (rate && rate > 0) {
      return {
        marketRate: rate,
        rate: applyFxMarkup(rate),
        source: "frankfurter.app",
      };
    }
  } catch {
    /* fallback */
  }
  return DEFAULT_FX;
}
