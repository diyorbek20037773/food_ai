"use client";

import { useTranslations } from "next-intl";
import { Logo } from "./logo";
import { Badge } from "@/components/ui/badge";

export function Footer() {
  const t = useTranslations("footer");
  const tn = useTranslations("nav");

  const year = 2026;

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-x py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-ink-soft">
              {t("tagline")}
            </p>
            <p className="mt-5 text-sm text-ink-mute">{t("madeIn")}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">{t("product")}</p>
            <ul className="mt-4 flex flex-col gap-2.5 text-[15px] text-ink-soft">
              <li>
                <a href="#features" className="hover:text-ink">
                  {tn("features")}
                </a>
              </li>
              <li>
                <a href="#how" className="hover:text-ink">
                  {tn("how")}
                </a>
              </li>
              <li>
                <a href="#restaurants" className="hover:text-ink">
                  {tn("restaurants")}
                </a>
              </li>
              <li>
                <a href="#launch" className="hover:text-ink">
                  {tn("launch")}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-ink">{t("soon")}</p>
            <ul className="mt-4 flex flex-col gap-3 text-[15px] text-ink-soft">
              <li className="flex items-center gap-2">
                {t("tgApp")}
                <Badge tone="accent">{t("soon")}</Badge>
              </li>
              <li className="flex items-center gap-2">
                {t("pwa")}
                <Badge tone="accent">{t("soon")}</Badge>
              </li>
              <li className="flex items-center gap-2">
                {t("restaurantPanel")}
                <Badge tone="accent">{t("soon")}</Badge>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-sm text-ink-mute sm:flex-row">
          <p className="tnum">
            © {year} FoodGPT. {t("rights")}
          </p>
        </div>
      </div>
    </footer>
  );
}
