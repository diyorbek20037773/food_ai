"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { Check, Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProblemSolution() {
  const t = useTranslations("problem");
  const oldSteps = t.raw("oldWay.steps") as string[];
  const newSteps = t.raw("newWay.steps") as string[];

  return (
    <section className="container-x py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
        <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-tight">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          {t("lead")}
        </p>
      </Reveal>

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        {/* Old way */}
        <Reveal delay={0.05}>
          <Column
            variant="old"
            title={t("oldWay.title")}
            time={t("oldWay.time")}
            steps={oldSteps}
          />
        </Reveal>

        {/* New way */}
        <Reveal delay={0.12}>
          <Column
            variant="new"
            title={t("newWay.title")}
            time={t("newWay.time")}
            steps={newSteps}
          />
        </Reveal>
      </div>
    </section>
  );
}

function Column({
  variant,
  title,
  time,
  steps,
}: {
  variant: "old" | "new";
  title: string;
  time: string;
  steps: string[];
}) {
  const isNew = variant === "new";
  return (
    <div
      className={cn(
        "h-full rounded-card-lg border p-6 md:p-7",
        isNew
          ? "border-transparent bg-gradient-to-br from-[color-mix(in_srgb,var(--accent)_9%,var(--surface))] to-surface shadow-glow ring-1 ring-[color-mix(in_srgb,var(--accent)_25%,transparent)]"
          : "border-line bg-surface shadow-soft",
      )}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tnum",
            isNew
              ? "bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-accent-ink"
              : "bg-surface-2 text-ink-soft",
          )}
        >
          <Clock className="h-3.5 w-3.5" />
          {time}
        </span>
      </div>

      <ul className="mt-5 space-y-3">
        {steps.map((s, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                isNew
                  ? "bg-[color-mix(in_srgb,var(--success)_16%,transparent)] text-success"
                  : "bg-surface-2 text-ink-mute",
              )}
            >
              {isNew ? (
                <Check className="h-3 w-3" strokeWidth={3} />
              ) : (
                <X className="h-3 w-3" strokeWidth={3} />
              )}
            </span>
            <span
              className={cn(
                "text-[15px] leading-snug",
                isNew ? "text-ink" : "text-ink-soft",
              )}
            >
              {s}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
