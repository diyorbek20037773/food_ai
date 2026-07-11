"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import {
  MessageSquareText,
  Radio,
  CalendarCheck,
  Navigation,
  Sparkles,
  LayoutDashboard,
} from "lucide-react";

const ICONS = [
  MessageSquareText,
  Radio,
  CalendarCheck,
  Navigation,
  Sparkles,
  LayoutDashboard,
];

export function Features() {
  const t = useTranslations("features");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section id="features" className="scroll-mt-24 bg-surface-2/50 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-tight">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            {t("subtitle")}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = ICONS[i] ?? Sparkles;
            return (
              <Reveal key={i} delay={0.04 * i}>
                <div className="group h-full rounded-card border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[15px] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent transition-transform duration-300 group-hover:scale-105">
                    <Icon className="h-[22px] w-[22px]" />
                  </div>
                  <h3 className="mt-5 text-[17px] font-semibold">{item.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
