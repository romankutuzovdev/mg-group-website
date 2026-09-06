import type { AuctionLot } from "@/lib/auctions/types";
import { DEFAULT_FX, fetchFxRateGbpUsd } from "@/lib/pricing/fx-rate";
import { quoteCopartUk, type CopartQuote } from "@/lib/pricing/copart-uk";
import { quoteIaaiUsa, type IaaiQuote } from "@/lib/pricing/iaai-usa";

export type LotQuoteResult =
  | { region: "uk"; quote: CopartQuote; fxSource: string }
  | { region: "usa"; quote: IaaiQuote };

/** Sync estimate for cards / lists (UK uses default FX). */
export function estimateLotTurnkey(lot: AuctionLot): {
  amount: number;
  currency: "USD" | "GBP";
  label: string;
} | null {
  const title = `${lot.year} ${lot.make} ${lot.model}`;
  const bodyStyle = lot.bodyStyle ?? lot.model;

  if (lot.region === "uk") {
    const quote = quoteCopartUk({
      bid: lot.currency === "GBP" ? lot.currentBid : lot.currentBid * 0.79,
      location: lot.location,
      category: lot.category,
      title,
      bodyStyle,
      vatOnSale: lot.vatOnSale,
      fxRate: DEFAULT_FX.rate,
      fxMarketRate: DEFAULT_FX.marketRate,
      dismantleKg: lot.weightKg,
    });
    if (!quote) return null;
    if (quote.grandUsd != null) {
      return { amount: Math.round(quote.grandUsd), currency: "USD", label: "Под ключ" };
    }
    return { amount: Math.round(quote.totalUk), currency: "GBP", label: "Под ключ UK" };
  }

  const quote = quoteIaaiUsa({
    bid: lot.currentBid,
    title,
    bodyStyle,
    location: lot.location,
    inlandMiles: lot.inlandMiles ?? 450,
    dismantleKg: lot.weightKg,
    volume: "standard",
    includeAmericaDelivery: true,
  });
  if (!quote) return null;
  return { amount: Math.round(quote.grandUsd), currency: "USD", label: "Под ключ" };
}

export async function buildLotQuote(lot: AuctionLot): Promise<LotQuoteResult | null> {
  const title = `${lot.year} ${lot.make} ${lot.model}`;
  const bodyStyle = lot.bodyStyle ?? lot.model;

  if (lot.region === "uk") {
    const fx = await fetchFxRateGbpUsd();
    const quote = quoteCopartUk({
      bid: lot.currency === "GBP" ? lot.currentBid : lot.currentBid * 0.79,
      location: lot.location,
      category: lot.category,
      title,
      bodyStyle,
      vatOnSale: lot.vatOnSale,
      fxRate: fx.rate,
      fxMarketRate: fx.marketRate,
      dismantleKg: lot.weightKg,
    });
    if (!quote) return null;
    return { region: "uk", quote, fxSource: fx.source };
  }

  const quote = quoteIaaiUsa({
    bid: lot.currentBid,
    title,
    bodyStyle,
    location: lot.location,
    inlandMiles: lot.inlandMiles ?? 450,
    dismantleKg: lot.weightKg,
    volume: "standard",
    includeAmericaDelivery: true,
  });
  if (!quote) return null;
  return { region: "usa", quote };
}

export function lotTitle(lot: AuctionLot): string {
  return `${lot.year} ${lot.make} ${lot.model}`;
}
