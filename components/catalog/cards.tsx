import Link from "next/link";
import type { CatalogMake, CatalogModel } from "@/lib/catalog";
import { catalogPath } from "@/lib/catalog";

export function MakeCard({
  regionSlug,
  make,
}: {
  regionSlug: string;
  make: CatalogMake;
}) {
  return (
    <Link
      href={catalogPath(regionSlug, make.slug)}
      className="group flex flex-col items-center gap-3 rounded-xl border bg-white p-5 text-center shadow-sm transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="flex h-16 w-16 items-center justify-center">
        {make.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={make.logo} alt={make.name} className="max-h-14 max-w-14 object-contain" />
        ) : (
          <span className="text-lg font-bold text-primary">{make.name.slice(0, 2)}</span>
        )}
      </div>
      <span className="text-sm font-semibold group-hover:text-primary">{make.name}</span>
      <span className="text-xs text-muted-foreground">{make.models.length} моделей</span>
    </Link>
  );
}

export function ModelCard({
  regionSlug,
  makeSlug,
  makeName,
  model,
}: {
  regionSlug: string;
  makeSlug: string;
  makeName: string;
  model: CatalogModel;
}) {
  return (
    <Link
      href={catalogPath(regionSlug, makeSlug, model.slug)}
      className="group overflow-hidden rounded-xl border bg-white shadow-sm transition hover:border-primary/40 hover:shadow-md"
    >
      <div className="relative aspect-[16/10] bg-zinc-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={model.image}
          alt={`${makeName} ${model.name}`}
          className="h-full w-full object-cover transition group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{makeName}</p>
        <h3 className="mt-1 font-semibold group-hover:text-primary">{model.name}</h3>
        <p className="mt-2 text-sm text-primary">Подробнее →</p>
      </div>
    </Link>
  );
}
