"use client";

import { useMemo, useState } from "react";
import type { AuctionLot } from "@/lib/auctions/types";
import type { CopartQuote } from "@/lib/pricing/copart-uk";
import type { IaaiQuote } from "@/lib/pricing/iaai-usa";
import { CopartQuoteDisplay, IaaiQuoteDisplay } from "./quote-display";
import { computeLiveQuote, QuoteTotals } from "./live-quote";
import { parseBidInput, useFxRate } from "./use-fx-rate";

type Props = {
  lot: AuctionLot;
};

export function LotCalculatorPanel({ lot }: Props) {
  const fx = useFxRate();
  const [bidText, setBidText] = useState(String(lot.currentBid));
  const [inlandMilesText, setInlandMilesText] = useState(String(lot.inlandMiles ?? 450));
  const [dismantleKg, setDismantleKg] = useState(lot.weightKg ? String(lot.weightKg) : "");

  const bid = parseBidInput(bidText);
  const fxRate = fx.rate;

  const quote = useMemo(
    () => computeLiveQuote(lot, bidText, fx, { inlandMilesText, dismantleKg }),
    [lot, bidText, fx, inlandMilesText, dismantleKg],
  );

  return (
    <div className="card-premium rounded-xl p-5 sm:p-6">
      <h2 className="font-display text-lg font-semibold">Расчёт под ключ</h2>
      <p className="mt-1 text-xs text-text-muted">Copart UK / IAAI USA + доставка + разбор.</p>

      <div className="mt-4 space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
          Ваша ставка для расчёта ({lot.currency})
          <input
            type="number"
            min={0}
            step={1}
            inputMode="decimal"
            value={bidText}
            onChange={(e) => setBidText(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-lg font-semibold text-text-primary"
          />
        </label>
        {quote ? (
          <p className="rounded-lg bg-accent/10 px-3 py-2 text-sm">
            Расчёт для {lot.currency === "GBP" ? "£" : "$"}
            {bid.toLocaleString("ru-RU")} →{" "}
            <span className="font-display font-bold text-accent-dark">
              {"grandUsd" in quote && quote.grandUsd != null
                ? `$${Math.round(quote.grandUsd).toLocaleString("en-US")}`
                : "totalUk" in quote
                  ? `£${Math.round(quote.totalUk).toLocaleString("en-GB")}`
                  : "—"}
            </span>
          </p>
        ) : null}

        {lot.region === "usa" ? (
          <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
            Мили до порта (США)
            <input
              type="text"
              inputMode="numeric"
              value={inlandMilesText}
              onChange={(e) => setInlandMilesText(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
            />
          </label>
        ) : null}

        <label className="block text-xs font-semibold uppercase tracking-wide text-text-muted">
          Вес для разбора, кг (опционально)
          <input
            type="text"
            inputMode="decimal"
            placeholder="800 + 1.6×кг (UK) / 1300 + 2.2×кг (USA)"
            value={dismantleKg}
            onChange={(e) => setDismantleKg(e.target.value)}
            className="mt-1 w-full rounded-lg border border-border px-3 py-2 text-sm"
          />
        </label>
      </div>

      {quote ? (
        <div className="mt-6 border-t border-border pt-4" key={`${bidText}-${fxRate}-${dismantleKg}-${inlandMilesText}`}>
          {lot.region === "uk" ? (
            <CopartQuoteDisplay quote={quote as CopartQuote} />
          ) : (
            <IaaiQuoteDisplay quote={quote as IaaiQuote} />
          )}
          <QuoteTotals quote={quote} region={lot.region} />
        </div>
      ) : null}
    </div>
  );
}
