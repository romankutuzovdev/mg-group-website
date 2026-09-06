import { GetStaticProps } from "next";
import SEO from "@/components/SEO";
import { AuctionsCatalog } from "@/components/auctions/auctions-catalog";
import { YardsMap } from "@/components/kits/yards-map";
import { PageShell } from "@/components/layout/page-shell";
import { CommercialPricingSection } from "@/components/pricing/commercial-pricing-section";
import { AnchorButton, LinkButton } from "@/components/site/button";
import { getDictionary } from "@/lib/dictionary";
import type { Dictionary } from "@/lib/dictionary";
import { getCatalogLots } from "@/lib/auctions/repository";
import type { AuctionLot } from "@/lib/auctions/types";
import { CONSULTATION_TG, PARTS } from "@/lib/company";

interface Props {
  dictionary: Dictionary;
  lots: AuctionLot[];
}

export default function MashinokomplektPage({ dictionary, lots }: Props) {
  return (
    <>
      <SEO
        dictionary={{
          ...dictionary,
          metadata: {
            ...dictionary.metadata,
            title: "Машинокомплекты с аукционов США и Англии | MG.GROUP",
            description:
              "Машинокомплекты из США и Англии: лоты Copart / IAAI / Copart UK со ставками и расчётом под ключ. Разборка, упаковка, доставка в Беларусь.",
          },
        }}
        lang="ru"
      />

      <PageShell
        title="Машинокомплекты с аукционов США и Англии"
        description="Выкупаем авто-доноры на Copart, IAAI и Copart UK, разбираем по бланку и везём комплектом в Беларусь. Ниже — актуальные лоты со ставками и просчётом."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {PARTS.features.map((feature) => (
            <article key={feature.title} className="card-premium rounded-2xl p-8">
              <h2 className="font-display text-xl font-semibold">{feature.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">{feature.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="#lots">Смотреть лоты на аукционах</LinkButton>
          <LinkButton href="#razborki" variant="secondary">
            Разборки и маршруты
          </LinkButton>
          <AnchorButton href={CONSULTATION_TG} target="_blank" rel="noopener noreferrer" variant="secondary">
            Заказать подбор
          </AnchorButton>
        </div>
      </PageShell>

      <section id="lots" className="scroll-mt-24 border-t border-border bg-bg-base py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="lux-kicker">Аукционы для комплектов</p>
            <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              Лоты Copart / Bid.cars — США · Copart UK — Англия
            </h2>
            <p className="mt-4 text-sm text-text-secondary sm:text-base">
              Это не «готовые авто под ключ», а доноры под машинокомплект: смотрите ставку, повреждения и
              сразу считайте стоимость с доставкой и разбором. Лоты Bid.cars (США) и Copart UK (Англия).
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl px-4 sm:px-6 lg:px-8">
          <AuctionsCatalog lots={lots} />
        </div>
      </section>

      <YardsMap />

      <CommercialPricingSection />

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="card-premium rounded-2xl p-8">
            <h2 className="font-display text-xl font-semibold">Как это работает</h2>
            <ul className="mt-4 space-y-2 text-sm text-text-secondary">
              <li>Подбираем лот на аукционе США или Англии под ваш бланк</li>
              <li>США: аукцион → Нью-Джерси / Техас → море → Турция → Новороссийск → Гродно / Минск</li>
              <li>Англия: Лондон → Франция → Гродно → Минск по суше</li>
              <li>Разборка, упаковка и контейнер — под ваш объём (штучно или оптом)</li>
            </ul>
          </div>
          <div className="card-premium rounded-2xl p-8">
            <h2 className="font-display text-xl font-semibold">{PARTS.ctaTitle}</h2>
            <p className="mt-3 text-sm text-text-secondary">{PARTS.ctaDescription}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <AnchorButton href={CONSULTATION_TG} target="_blank" rel="noopener noreferrer">
                Заказать машинокомплект
              </AnchorButton>
              <LinkButton href="/calculator/" variant="secondary">
                Калькулятор
              </LinkButton>
              <LinkButton href="/faq/" variant="secondary">
                FAQ
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    dictionary: getDictionary(),
    lots: getCatalogLots(),
  },
});
