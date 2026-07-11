import { useTranslations } from "next-intl";
import { Sparkles, Star, MapPin, Send } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const prompts = t.raw("prompts") as string[];

  return (
    <section className="relative overflow-hidden pt-14 md:pt-20 pb-20 md:pb-28">
      {/* Ambient warm glow */}
      <div
        aria-hidden
        className="glow-blob left-1/2 top-[-140px] h-[460px] w-[620px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(255,107,53,.30), rgba(255,183,3,.12) 55%, transparent 72%)",
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

          {/* Primary CTAs — the app lives in Telegram & PWA, "soon" */}
          <div className="mt-9 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row [animation-delay:260ms]">
            <span className="group relative inline-flex h-[52px] cursor-default items-center gap-2 rounded-control bg-accent px-7 text-base font-medium text-white shadow-glow">
              <Send className="h-[18px] w-[18px]" />
              {t("ctaPrimary")}
              <span className="ml-1 rounded-full bg-white/20 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide">
                {t("soon")}
              </span>
            </span>
            <span className="inline-flex h-[52px] cursor-default items-center gap-2 rounded-control border border-line-strong bg-surface px-7 text-base font-medium text-ink shadow-soft">
              {t("ctaSecondary")}
              <span className="ml-1 rounded-full bg-surface-2 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-ink-soft">
                {t("soon")}
              </span>
            </span>
          </div>
        </div>

        {/* Conversation preview — shows how the app feels, static */}
        <div className="mx-auto mt-16 max-w-md animate-fade-up [animation-delay:380ms]">
          <p className="mb-3 text-center text-[13px] font-medium uppercase tracking-wider text-ink-mute">
            {t("example")}
          </p>

          {/* User-style prompt chips (illustrative, not interactive) */}
          <div className="mb-3 flex flex-wrap justify-center gap-2">
            {prompts.map((p) => (
              <span
                key={p}
                className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-ink-soft shadow-soft"
              >
                {p}
              </span>
            ))}
          </div>

          {/* AI reply card */}
          <div className="rounded-card-lg border border-line bg-surface p-2 shadow-soft-lg">
            <div className="flex items-center gap-2 px-3 py-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
                <Sparkles className="h-3.5 w-3.5 text-accent" />
              </span>
              <span className="text-sm font-medium text-ink-soft">FoodGPT</span>
            </div>
            <p className="px-3 pb-3 text-left text-[14px] leading-relaxed text-ink">
              {t("cardReply")}
            </p>
            <div className="flex items-center gap-3 rounded-card bg-surface-2 p-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-gradient-to-br from-accent to-amber text-2xl">
                🍚
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                  <p className="truncate font-semibold text-ink">
                    {t("cardName")}
                  </p>
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
