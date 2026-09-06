import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import { LotDamageMap } from "@/components/auctions/lot-damage-map";
import { LotImage } from "@/components/auctions/lot-image";
import { LotCalculatorPanel } from "@/components/pricing/lot-calculator-panel";
import { LinkButton } from "@/components/site/button";
import { getDictionary } from "@/lib/dictionary";
import type { Dictionary } from "@/lib/dictionary";
import { getAllSlugs, getLotBySlug } from "@/lib/auctions/repository";
import type { AuctionLot } from "@/lib/auctions/types";
import { REGION_LABELS, SOURCE_LABELS } from "@/lib/auctions/types";
import { CONSULTATION_TG } from "@/lib/company";

function formatMoney(amount: number, currency: "USD" | "GBP") {
  return new Intl.NumberFormat(currency === "GBP" ? "en-GB" : "en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function SpecRow({ label, value }: { label: string; value: string | boolean }) {
  const display = typeof value === "boolean" ? (value ? "Да" : "Нет") : value;
  return (
    <div className="flex justify-between gap-4 border-b border-border py-2.5 text-sm last:border-0">
      <span className="text-text-muted">{label}</span>
      <span className="text-right font-medium">{display}</span>
    </div>
  );
}

interface Props {
  dictionary: Dictionary;
  lot: AuctionLot;
}

export default function LotDetailPage({ dictionary, lot }: Props) {
  return (
    <>
      <SEO
        dictionary={{
          ...dictionary,
          metadata: {
            ...dictionary.metadata,
            title: `${lot.year} ${lot.make} ${lot.model} — ${SOURCE_LABELS[lot.source]} | MG.GROUP`,
            description: `Лот #${lot.lotNumber}. ${lot.primaryDamage}. Ставка от ${formatMoney(lot.currentBid, lot.currency)}.`,
          },
        }}
        lang="ru"
      />
      <div className="pt-16">
        <div className="border-b border-border bg-bg-elevated">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Link
              href="/mashinokomplekt/#lots"
              className="inline-flex items-center gap-1 text-sm text-text-secondary transition hover:text-accent-dark"
            >
              ← К машинокомплектам
            </Link>
            <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-md bg-black px-2 py-0.5 text-xs font-semibold text-white">
                    {SOURCE_LABELS[lot.source]}
                  </span>
                  <span className="rounded-md bg-accent/10 px-2 py-0.5 text-xs font-semibold text-accent-dark">
                    {REGION_LABELS[lot.region]}
                  </span>
                  <span className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-text-secondary">
                    #{lot.lotNumber}
                  </span>
                </div>
                <h1 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  {lot.year} {lot.make} {lot.model}
                </h1>
                <p className="mt-1 font-mono text-sm text-text-muted">{lot.vin}</p>
                {lot.source === "copart_uk" ? (
                  <a
                    href={`https://www.copart.co.uk/lot/${lot.lotNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-accent-dark underline underline-offset-2"
                  >
                    Лот на copart.co.uk →
                  </a>
                ) : null}
                {lot.region === "usa" && lot.lotUrl ? (
                  <a
                    href={lot.lotUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium text-accent-dark underline underline-offset-2"
                  >
                    Лот на Bid.cars →
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:gap-8">
            <div className="w-full min-w-0 lg:col-start-1 lg:row-start-1">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-border bg-zinc-100">
                <LotImage
                  src={lot.imageUrl}
                  alt={`${lot.year} ${lot.make} ${lot.model}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
            </div>

            <aside className="space-y-4 lg:col-start-2 lg:row-span-2 lg:self-start lg:sticky lg:top-24">
              <div className="card-premium rounded-xl p-5 sm:p-6">
                <p className="text-sm text-text-muted">Ставка на аукционе</p>
                <p className="font-display text-3xl font-bold text-accent-dark">
                  {formatMoney(lot.currentBid, lot.currency)}
                </p>
                {lot.buyNowPrice ? (
                  <p className="mt-2 text-sm text-text-secondary">
                    Buy Now:{" "}
                    <span className="font-semibold text-text-primary">
                      {formatMoney(lot.buyNowPrice, lot.currency)}
                    </span>
                  </p>
                ) : null}

                <div className="mt-4 rounded-lg bg-accent/10 p-3 text-sm">
                  <p className="font-medium text-accent-dark">Дата торгов</p>
                  <p className="mt-0.5 text-text-secondary">{formatDate(lot.auctionDate)}</p>
                </div>

                <LinkButton href="/contacts/" className="mt-5 w-full">
                  Оставить заявку
                </LinkButton>
              </div>

              <LotCalculatorPanel lot={lot} />
            </aside>

            <div className="space-y-6 lg:col-start-1">
              <div className="card-premium rounded-xl p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold">Характеристики</h2>
                <div className="mt-4">
                  <SpecRow label="Повреждение (основное)" value={lot.primaryDamage} />
                  {lot.secondaryDamage ? (
                    <SpecRow label="Повреждение (доп.)" value={lot.secondaryDamage} />
                  ) : null}
                  <SpecRow label="Title" value={lot.titleLabel} />
                  <SpecRow
                    label="Пробег"
                    value={`${lot.odometer.toLocaleString("ru-RU")} ${lot.odometerUnit}`}
                  />
                  {lot.engine ? <SpecRow label="Двигатель" value={lot.engine} /> : null}
                  {lot.bodyStyle ? <SpecRow label="Кузов" value={lot.bodyStyle} /> : null}
                  <SpecRow label="КПП" value={lot.transmission} />
                  <SpecRow label="Топливо" value={lot.fuel} />
                  <SpecRow label="Привод" value={lot.drive} />
                  <SpecRow label="Цвет" value={lot.exteriorColor} />
                  <SpecRow label="Ключи" value={lot.hasKeys} />
                  <SpecRow label="Run & Drive" value={lot.runsDrives} />
                  <SpecRow label="Локация" value={lot.location} />
                </div>
              </div>

              <LotDamageMap
                primaryDamage={lot.primaryDamage}
                secondaryDamage={lot.secondaryDamage}
              />

              <div className="card-premium rounded-xl p-5 sm:p-6">
                <h2 className="font-display text-lg font-semibold">Оценка запчастей</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Подберём комплектацию и ориентир по запчастям — напишите менеджеру с номером лота.
                </p>
                <a
                  href={CONSULTATION_TG}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex text-sm font-medium text-accent-dark underline underline-offset-2"
                >
                  Уточнить у менеджера →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllSlugs().map((slug) => ({ params: { slug } })),
  fallback: false,
});

export const getStaticProps: GetStaticProps = async (ctx) => {
  const slug = String(ctx.params?.slug ?? "");
  const lot = getLotBySlug(slug);
  if (!lot) {
    return { notFound: true };
  }
  return {
    props: {
      dictionary: getDictionary(),
      lot,
    },
  };
};
