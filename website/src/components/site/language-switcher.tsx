"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { Globe, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useTranslations("lang");
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: string) {
    router.replace(pathname, { locale: next });
    setOpen(false);
  }

  const labels: Record<string, string> = {
    uz: "UZ",
    ru: "RU",
    en: "EN",
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-label={t("label")}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-1.5 rounded-control border border-line bg-surface px-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink hover:bg-surface-2"
      >
        <Globe className="h-[17px] w-[17px]" />
        <span className="tnum">{labels[locale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-40 overflow-hidden rounded-card border border-line bg-surface p-1.5 shadow-soft-lg animate-fade-up">
          {routing.locales.map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => switchTo(l)}
              className={cn(
                "flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-sm transition-colors hover:bg-surface-2",
                l === locale ? "text-ink font-medium" : "text-ink-soft",
              )}
            >
              {t(l)}
              {l === locale && <Check className="h-4 w-4 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
