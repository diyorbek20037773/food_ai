"use client";

import { useTranslations } from "next-intl";
import { Star, MapPin, Clock, CalendarCheck, Navigation, Car } from "lucide-react";
import type { Restaurant } from "@/lib/mock";

export function RestaurantCard({
  r,
  index,
  onReserve,
}: {
  r: Restaurant;
  index: number;
  onReserve: () => void;
}) {
  const t = useTranslations("demo.card");

  return (
    <div
      style={{ animationDelay: `${0.06 * index}s` }}
      className="animate-fade-up rounded-card border border-line bg-surface p-3.5 shadow-soft"
    >
      <div className="flex items-start gap-3.5">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-accent to-amber text-2xl">
          {r.emoji}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate font-semibold text-ink">{r.name}</p>
              <p className="truncate text-[13px] text-ink-soft">{r.dish}</p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-surface-2 px-2 py-0.5 text-xs font-semibold tnum">
              <Star className="h-3 w-3 fill-amber text-amber" />
              {r.rating}
            </span>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-ink-soft tnum">
            <span className="inline-flex items-center gap-1 font-medium text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              {t("open")}
            </span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="h-3.5 w-3.5" />
              {r.km} {t("km")}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {r.waitMin} {t("min")} {t("wait")}
            </span>
            <span>
              {t("from")} {r.priceFrom} 000
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={onReserve}
          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-control bg-accent px-3 text-sm font-medium text-white transition-all hover:brightness-105 hover:-translate-y-px"
        >
          <CalendarCheck className="h-4 w-4" />
          {t("reserve")}
        </button>
        <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-control border border-line bg-surface px-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink hover:bg-surface-2">
          <Navigation className="h-4 w-4" />
          <span className="hidden sm:inline">{t("navigate")}</span>
        </button>
        <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-control border border-line bg-surface px-3 text-sm font-medium text-ink-soft transition-colors hover:text-ink hover:bg-surface-2">
          <Car className="h-4 w-4" />
          <span className="hidden sm:inline">{t("taxi")}</span>
        </button>
      </div>
    </div>
  );
}
