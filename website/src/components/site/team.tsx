"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { User } from "lucide-react";

export function Team() {
  const t = useTranslations("team");
  const slots = [0, 1, 2, 3];

  return (
    <section id="team" className="band scroll-mt-24 border-y border-line py-20 md:py-28">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="flex h-full flex-col items-center rounded-card border border-line bg-surface p-6 text-center shadow-soft">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_16%,var(--surface-2))] to-surface-2 text-ink-mute">
                  <User className="h-8 w-8" />
                </div>
                <div className="mt-4 h-4 w-24 rounded-full bg-surface-2" />
                <p className="mt-3 text-sm font-medium text-ink-mute">
                  {t("placeholderRole")}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-ink-mute">{t("note")}</p>
      </div>
    </section>
  );
}
