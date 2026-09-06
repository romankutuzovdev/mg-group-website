import Link from "next/link";
import { catalogPath, type CatalogRegion } from "@/lib/catalog";

type Crumb = { href?: string; label: string };

export function CatalogBreadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-6 text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link href="/" className="hover:text-foreground transition-colors">
            Главная
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5">
            <span aria-hidden>/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-foreground transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-foreground">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function regionCrumbs(region: CatalogRegion): Crumb[] {
  return [
    { href: catalogPath(), label: "Каталог авто" },
    { href: catalogPath(region.slug), label: region.title },
  ];
}
