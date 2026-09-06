"use client";

import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, MessageCircle, Phone } from "lucide-react";
import type { Dictionary } from "@/lib/dictionary";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface HeaderProps {
  dictionary: Dictionary;
}

type NavItem = { href: string; label: string };

const Header = ({ dictionary }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isHome = router.pathname === "/";

  const navItems: NavItem[] = [
    { href: "/", label: "Главная" },
    { href: "/about/", label: "О нас" },
    { href: "/avto/", label: "Каталог" },
    { href: "/mashinokomplekt/", label: "Машинокомплекты" },
    { href: "/kuplennye-avto/", label: "Купленные авто" },
    { href: "/calculator/", label: "Калькулятор" },
    { href: "/faq/", label: "FAQ" },
    { href: "/contacts/", label: "Контакты" },
  ];

  return (
    <header
      className="fixed inset-x-0 top-0 z-[100] border-b border-zinc-200 bg-white shadow-sm"
      role="banner"
      style={{ backgroundColor: "#ffffff", color: "#111111" }}
    >
      <div className="mx-auto max-w-[90rem] px-3 sm:px-4">
        <div className="flex h-16 items-center justify-between gap-2">
          <Link
            href={isHome ? "/#hero" : "/"}
            className="flex shrink-0 items-center gap-2 font-bold"
            style={{ color: "#111111" }}
            aria-label="На главную"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_new.svg"
              alt={dictionary.footer.company.name}
              className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            />
            <span className="hidden text-sm sm:inline sm:text-base">
              {dictionary.footer.company.name}
            </span>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex xl:gap-1"
            role="navigation"
            aria-label="Основная навигация"
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-md px-1.5 py-2 text-[12px] font-medium hover:bg-zinc-100 xl:px-2 xl:text-[13px]"
                style={{ color: "#1a1a1a" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={`tel:${dictionary.contact.phone}`}
              className="hidden items-center gap-1.5 text-sm font-semibold lg:inline-flex"
              style={{ color: "#111111" }}
              aria-label={`Позвонить по номеру ${dictionary.contact.phone}`}
            >
              <Phone className="h-4 w-4" aria-hidden />
              {dictionary.contact.phone}
            </a>

            <a
              href={dictionary.global.tgLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center justify-center gap-2 rounded-md bg-[#1B5E20] px-3 py-2 text-sm font-medium text-white hover:bg-[#0D3F10] sm:inline-flex"
              aria-label="Получить консультацию в Telegram"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              {dictionary.contact.consultation}
            </a>

            <a
              href={`tel:${dictionary.contact.phone}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-zinc-100 lg:hidden"
              style={{ color: "#111111" }}
              aria-label={`Позвонить по номеру ${dictionary.contact.phone}`}
            >
              <Phone className="h-5 w-5" aria-hidden="true" />
            </a>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-zinc-300 bg-white hover:bg-zinc-100 lg:hidden"
                  style={{ color: "#111111" }}
                  aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] bg-white sm:w-[360px]">
                <SheetHeader>
                  <SheetTitle className="text-left" style={{ color: "#111111" }}>
                    {dictionary.footer.company.name}
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-6">
                  <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
                    {navItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="rounded-md px-2 py-2.5 text-left text-base hover:bg-zinc-100"
                        style={{ color: "#1a1a1a" }}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                  <a
                    href={dictionary.global.tgLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#1B5E20] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#0D3F10]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {dictionary.contact.consultation}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
