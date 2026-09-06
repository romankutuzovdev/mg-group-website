import { GetStaticProps } from "next";
import SEO from "@/components/SEO";
import { PageShell } from "@/components/layout/page-shell";
import { CalculatorForm } from "@/components/pricing/calculator-form";
import { getDictionary } from "@/lib/dictionary";
import type { Dictionary } from "@/lib/dictionary";

interface Props {
  dictionary: Dictionary;
}

export default function CalculatorPage({ dictionary }: Props) {
  return (
    <>
      <SEO
        dictionary={{
          ...dictionary,
          metadata: {
            ...dictionary.metadata,
            title: "Калькулятор доставки | MG.GROUP",
            description:
              "Расчёт Copart UK и IAAI USA — buyer fees, VAT, доставка, разбор.",
          },
        }}
        lang="ru"
      />
      <PageShell
        title="Калькулятор доставки"
        description="Расчёт Copart UK и IAAI USA — buyer fees, VAT, доставка, разбор."
      >
        <CalculatorForm />
      </PageShell>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => ({
  props: { dictionary: getDictionary() },
});
