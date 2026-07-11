"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#features", label: t("features") },
    { href: "#how", label: t("how") },
    { href: "#restaurants", label: t("restaurants") },
    { href: "#contact", label: t("contact") },
  ];

  return (
    <header
      className={cn(
        "sticky top-0 z-40 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-[var(--glass)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between md:h-[72px]">
        <Link href="/" aria-label="FoodGPT" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-ink hover:bg-surface-2"
            >
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <a
            href="#launch"
            className="ml-1 inline-flex h-9 items-center gap-2 rounded-control bg-accent px-4 text-sm font-medium text-white shadow-glow transition-all hover:-translate-y-px hover:brightness-105"
          >
            {t("launch")}
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-line bg-surface text-ink"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      {open && (
        <div className="border-t border-line bg-surface px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-control px-3 py-2.5 text-[15px] font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
              >
                {l.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <LanguageSwitcher />
            <a
              href="#launch"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-control bg-accent px-5 text-[15px] font-medium text-white shadow-glow"
            >
              {t("launch")}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
