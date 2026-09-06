import { GetStaticProps } from "next";
import SEO from "@/components/SEO";
import { PageShell } from "@/components/layout/page-shell";
import { CasesFeed } from "@/components/pages/cases-feed";
import { PurchasedCarCard } from "@/components/purchased/purchased-car-card";
import { LinkButton } from "@/components/site/button";
import { getDictionary } from "@/lib/dictionary";
import type { Dictionary } from "@/lib/dictionary";
import {
  formatMoney,
  getPurchasedCarsFeed,
  purchasedCarsSummary,
} from "@/lib/purchased-cars";

interface Props {
  dictionary: Dictionary;
}

export default function PurchasedCarsPage({ dictionary }: Props) {
  const cars = getPurchasedCarsFeed();
  const summary = purchasedCarsSummary(cars);

  return (
    <>
      <SEO
        dictionary={{
          ...dictionary,
          metadata: {
            ...dictionary.metadata,
            title: "Купленные авто | MG.GROUP",
            description:
              "Реальные авто и лоты с расчётом под ключ: аукцион, доставка, разборка и выгода относительно рынка РБ.",
          },
        }}
        lang="ru"
      />
      <PageShell
        title="Купленные авто"
        description="Лоты из каталога с просчётом под ключ. Для каждой — ставка, доставка/разбор и итог."
      >
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          <div className="card-premium rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Сделок
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-accent-dark">
              {summary.count}
            </p>
          </div>
          <div className="card-premium rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Средняя выгода
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-accent-dark">
              {summary.avgSavings}%
            </p>
          </div>
          <div className="card-premium rounded-xl p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Сэкономили клиентам
            </p>
            <p className="mt-2 font-display text-3xl font-semibold text-accent-dark">
              {formatMoney(summary.savedUsd, "USD")}
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cars.map((car) => (
            <PurchasedCarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="relative mt-16 overflow-hidden rounded-2xl border border-accent/20 bg-bg-elevated p-8 md:p-12">
          <div className="bg-grid absolute inset-0 opacity-40" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-accent">
                MG.GROUP
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                Хотите такое же авто?
              </h2>
              <p className="mt-2 max-w-lg text-sm text-text-secondary">
                Подберём лот, посчитаем полную стоимость до Минска и покажем, сколько обойдётся до
                постановки на учёт.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LinkButton href="/calculator/">Получить расчёт</LinkButton>
              <LinkButton href="/mashinokomplekt/#lots" variant="secondary">
                Лоты под комплекты
              </LinkButton>
            </div>
          </div>
        </div>
      </PageShell>

      <CasesFeed showHeaderLink={false} />
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { dictionary: getDictionary() },
});
