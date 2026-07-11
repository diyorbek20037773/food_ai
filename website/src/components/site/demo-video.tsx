"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { Play } from "lucide-react";

export function DemoVideo() {
  const t = useTranslations("demoVideo");

  return (
    <section className="container-x py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
        <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-tight">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          {t("subtitle")}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto mt-10 max-w-4xl">
        <div className="relative aspect-video overflow-hidden rounded-card-lg border border-line bg-surface shadow-soft-lg">
          {/* warm placeholder backdrop */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 50% 0%, color-mix(in srgb, var(--accent) 16%, var(--surface)) 0%, var(--surface) 60%)",
            }}
          />
          <div className="relative flex h-full flex-col items-center justify-center gap-5">
            <span className="group flex h-20 w-20 items-center justify-center rounded-full bg-accent text-white shadow-glow">
              <Play className="ml-1 h-8 w-8 fill-white" />
            </span>
            <p className="text-sm font-medium text-ink-soft">
              {t("comingSoon")}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
