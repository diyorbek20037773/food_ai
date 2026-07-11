import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { LayoutDashboard, Radio, Users, BarChart3, ArrowRight } from "lucide-react";

const ICONS = [LayoutDashboard, Radio, Users, BarChart3];

export function ForRestaurants() {
  const t = useTranslations("forRestaurants");
  const items = t.raw("items") as { title: string; desc: string }[];

  return (
    <section id="restaurants" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <Reveal>
          <div className="relative overflow-hidden rounded-card-lg border border-line bg-surface p-8 shadow-soft-lg md:p-12">
            {/* warm ambient wash */}
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-70 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--accent) 24%, transparent), transparent 70%)",
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
              {/* Left: pitch + CTA */}
              <div>
                <span className="eyebrow mb-4">{t("eyebrow")}</span>
                <h2 className="text-[clamp(1.7rem,3.4vw,2.5rem)] font-bold leading-tight">
                  {t("title")}
                </h2>
                <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">
                  {t("subtitle")}
                </p>
                <a
                  href="#contact"
                  className="mt-7 inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 text-base font-medium text-white shadow-glow transition-all hover:-translate-y-px hover:brightness-105"
                >
                  {t("cta")}
                  <ArrowRight className="h-[18px] w-[18px]" />
                </a>
                <p className="mt-3 text-[13px] text-ink-mute">{t("ctaNote")}</p>
              </div>

              {/* Right: benefit cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                {items.map((item, i) => {
                  const Icon = ICONS[i] ?? LayoutDashboard;
                  return (
                    <div
                      key={i}
                      className="rounded-card border border-line bg-bg p-5 shadow-soft"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <h3 className="mt-4 text-[15px] font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
