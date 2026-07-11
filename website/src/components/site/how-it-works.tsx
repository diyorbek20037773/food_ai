"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { MessagesSquare, Wand2, MapPinned } from "lucide-react";

const ICONS = [MessagesSquare, Wand2, MapPinned];

export function HowItWorks() {
  const t = useTranslations("how");
  const steps = t.raw("steps") as { n: string; title: string; desc: string }[];

  return (
    <section id="how" className="container-x scroll-mt-24 py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
        <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-tight">
          {t("title")}
        </h2>
      </Reveal>

      <div className="relative mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
        {/* connecting line (desktop) */}
        <div
          aria-hidden
          className="absolute left-[16%] right-[16%] top-[38px] hidden h-px bg-gradient-to-r from-transparent via-line to-transparent md:block"
        />
        {steps.map((step, i) => {
          const Icon = ICONS[i] ?? MessagesSquare;
          return (
            <Reveal key={i} delay={0.08 * i} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-[24px] border border-line bg-surface shadow-soft">
                  <Icon className="h-8 w-8 text-accent" />
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow-glow tnum">
                    {step.n}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-ink-soft">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
