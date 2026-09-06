import Link from "next/link";
import { LotImage } from "@/components/auctions/lot-image";
import { estimateLotTurnkey } from "@/lib/auctions/lot-quote";
import type { AuctionLot } from "@/lib/auctions/types";
import { REGION_LABELS, SOURCE_LABELS } from "@/lib/auctions/types";

function formatMoney(amount: number, currency: "USD" | "GBP") {
  return new Intl.NumberFormat(currency === "GBP" ? "en-GB" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function formatMiles(miles: number) {
  return `${miles.toLocaleString("ru-RU")} mi`;
}

export function LotCard({ lot }: { lot: AuctionLot }) {
  let turnkey: ReturnType<typeof estimateLotTurnkey> = null;
  try {
    turnkey = estimateLotTurnkey(lot);
  } catch {
    turnkey = null;
  }

  return (
    <Link href={`/auctions/${lot.slug}/`} className="group block h-full min-w-0">
      <article className="card-premium flex h-full min-w-0 flex-col overflow-hidden rounded-xl">
        <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-zinc-100">
          <LotImage
            src={lot.imageUrl}
            alt={`${lot.year} ${lot.make} ${lot.model}`}
            fill
            loading="lazy"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute left-2 top-2 flex flex-wrap gap-1 sm:left-3 sm:top-3 sm:gap-1.5">
            <span className="rounded-md bg-black/70 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white sm:px-2 sm:text-[10px]">
              {SOURCE_LABELS[lot.source]}
            </span>
            <span className="rounded-md bg-[#22c55e] px-1.5 py-0.5 text-[9px] font-semibold text-white sm:px-2 sm:text-[10px]">
              {REGION_LABELS[lot.region]}
            </span>
          </div>
          {lot.buyNowPrice ? (
            <span className="absolute right-2 top-2 rounded-md bg-accent-dark px-1.5 py-0.5 text-[9px] font-semibold text-white sm:right-3 sm:top-3 sm:px-2 sm:text-[10px]">
              Buy Now
            </span>
          ) : null}
          <span className="absolute bottom-2 left-2 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums tracking-wide text-white sm:bottom-3 sm:left-3 sm:px-2 sm:text-[11px]">
            {formatMiles(lot.odometer)}
          </span>
        </div>

        <div className="flex min-w-0 flex-1 flex-col p-3.5 sm:p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-accent-dark sm:text-base">
              {lot.year} {lot.make} {lot.model}
            </h3>
            <span className="shrink-0 text-[10px] text-text-muted sm:text-xs">#{lot.lotNumber}</span>
          </div>

          <p className="mt-1 truncate font-mono text-[10px] text-text-muted sm:text-xs">{lot.vin}</p>

          <div className="mt-2 flex flex-wrap gap-1.5 text-[10px] sm:mt-3 sm:gap-2 sm:text-xs">
            <span className="rounded-full bg-red-50 px-2 py-0.5 text-red-700">{lot.primaryDamage}</span>
            <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-text-secondary">
              {lot.titleLabel}
            </span>
            {lot.runsDrives ? (
              <span className="rounded-full bg-green-50 px-2 py-0.5 text-green-700">R&D</span>
            ) : null}
          </div>

          <div className="mt-3 border-t border-border pt-3 sm:mt-4">
            <div className="flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[10px] text-text-muted sm:text-xs">Ставка</p>
                <p className="text-sm font-semibold tabular-nums text-text-secondary sm:text-base">
                  {formatMoney(lot.currentBid, lot.currency)}
                </p>
              </div>
              <div className="min-w-0 text-right text-[10px] leading-snug text-text-muted sm:text-xs">
                <p className="truncate">{lot.location}</p>
                <p className="mt-0.5 text-accent">{formatDate(lot.auctionDate)}</p>
              </div>
            </div>

            {turnkey ? (
              <div className="mt-2.5 rounded-lg bg-accent/10 px-2.5 py-2 sm:mt-3 sm:px-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-accent-dark sm:text-xs">
                    {turnkey.label}
                  </p>
                  <p className="font-display text-lg font-bold tabular-nums text-accent-dark sm:text-xl">
                    {formatMoney(turnkey.amount, turnkey.currency)}
                  </p>
                </div>
                <p className="mt-0.5 text-[10px] leading-snug text-text-muted sm:text-[11px]">
                  Ставка + аукцион + доставка + разборка
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </article>
    </Link>
  );
}
