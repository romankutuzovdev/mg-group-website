import Link from "next/link";

const services: {
  title: string;
  description: string;
  tag: string;
  span: string;
  href?: string;
}[] = [
  {
    title: "Машинокомплекты с аукционов",
    description:
      "Доноры Copart / IAAI / Copart UK под разборку. Ставки, расчёт и доставка комплектом в РБ.",
    tag: "01",
    span: "lg:col-span-2",
    href: "/mashinokomplekt/",
  },
  {
    title: "Техника и спецтехника",
    description: "Гидроциклы, квадроциклы, моторные лодки, катера и строительная техника.",
    tag: "02",
    span: "",
  },
  {
    title: "Купленные авто",
    description: "Реальные сделки: какие машины выкупили на аукционе и за сколько они обошлись.",
    tag: "03",
    span: "",
    href: "/kuplennye-avto/",
  },
  {
    title: "Под ключ",
    description:
      "Полное таможенное оформление, сертификация, ремонт и постановка на учёт — всё в одном окне.",
    tag: "04",
    span: "lg:col-span-2",
    href: "/calculator/",
  },
];

export function Services() {
  return (
    <section className="border-t border-border bg-bg-base py-14 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="lux-kicker">Услуги</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
            Полный цикл — одна команда
          </h2>
          <p className="mt-4 text-sm text-text-secondary sm:text-base">
            Не просто логистика. MG.GROUP сопровождает сделку от первого лота до постановки на учёт.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-14 lg:grid-cols-3">
          {services.map((service) => {
            const card = (
              <>
                <span className="font-display text-5xl font-bold text-black/[0.04] transition group-hover:text-accent/15">
                  {service.tag}
                </span>
                <h3 className="mt-4 font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-accent to-transparent transition-all duration-500 group-hover:w-full" />
              </>
            );
            const className = `card-premium reveal-on-scroll group relative overflow-hidden rounded-2xl p-6 sm:p-8 ${service.span}`;

            return service.href ? (
              <Link key={service.tag} href={service.href} className={`${className} block`}>
                {card}
              </Link>
            ) : (
              <article key={service.tag} className={className}>
                {card}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
