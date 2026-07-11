import { useTranslations } from "next-intl";
import { Sparkles, Star, MapPin } from "lucide-react";
import { HeroInput } from "./hero-input";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative overflow-hidden pt-14 md:pt-20 pb-20 md:pb-28">
      {/* Ambient warm glow */}
      <div
        aria-hidden
        className="glow-blob left-1/2 top-[-120px] h-[420px] w-[560px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,53,.28), rgba(255,183,3,.10) 55%, transparent 70%)",
        }}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <div className="animate-fade-up [animation-delay:0ms]">
            <span className="eyebrow mb-6 justify-center rounded-full border border-line bg-surface px-4 py-1.5 shadow-soft">
              <Sparkles className="h-3.5 w-3.5" />
              {t("badge")}
            </span>
          </div>

          <p className="mb-3 animate-fade-up text-lg text-ink-soft [animation-delay:60ms]">
            👋 {t("greeting")}
          </p>

          <h1 className="animate-fade-up text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[1.05] text-ink [animation-delay:120ms]">
            {t("title")}
          </h1>

          <p className="mx-auto mt-5 max-w-xl animate-fade-up text-[17px] leading-relaxed text-ink-soft [animation-delay:180ms]">
            {t("subtitle")}
          </p>

          <div className="mt-9 animate-fade-up [animation-delay:260ms]">
            <HeroInput />
          </div>
        </div>

        {/* Floating live recommendation card */}
        <div className="mx-auto mt-14 max-w-md animate-fade-up [animation-delay:380ms]">
          <div className="rounded-card-lg border border-line bg-surface p-2 shadow-soft-lg">
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
              </span>
              <span className="text-sm font-medium text-ink-soft">FoodGPT</span>
            </div>
            <div className="flex items-center gap-3 rounded-card bg-surface-2 p-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br from-accent to-amber text-2xl">
                🍚
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <p className="truncate font-semibold text-ink">Besh Qozon</p>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-success">
                    <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-success" />
                    {t("cardStatus")}
                  </span>
                </div>
                <p className="mt-0.5 flex items-center gap-2 text-[13px] text-ink-soft tnum">
                  <MapPin className="h-3.5 w-3.5" />
                  {t("cardMeta")}
                </p>
              </div>
              <Star className="h-4 w-4 shrink-0 fill-amber text-amber" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
