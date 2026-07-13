import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowRight, Rocket, Trophy, Users } from "lucide-react";
import { Reveal } from "./reveal";

/**
 * Home-page UzCombinator promo band — a compact, dark "final CTA" style block
 * that mirrors founders/uzc-template.html and links to the full /uzcombinator page.
 */
export function UzCombinator() {
  const t = useTranslations("uzc");

  const badges = [
    { icon: Rocket, label: t("b1") },
    { icon: Trophy, label: t("b2") },
    { icon: Users, label: t("b3") },
  ];

  return (
    <section id="uzcombinator" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[28px] border border-line bg-surface px-6 py-14 text-center shadow-soft-lg md:px-12 md:py-16">
          {/* ambient warm wash — theme-agnostic (uses accent token) */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 55% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
            }}
          />

          <div className="relative">
            <span
              className="eyebrow justify-center"
              style={{ color: "var(--accent-ink)" }}
            >
              {t("eyebrow")}
            </span>

            <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold leading-tight text-ink">
              {t("title")}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
              {t("subtitle")}
            </p>

            {/* traction badges */}
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              {badges.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-2xl border border-line bg-surface-2 px-4 py-2.5 text-[13px] font-medium text-ink"
                >
                  <Icon className="h-4 w-4 text-accent" />
                  {label}
                </span>
              ))}
            </div>

            <div className="mt-9">
              <Link
                href="/uzcombinator"
                className="group inline-flex h-12 items-center gap-2 rounded-control bg-accent px-7 font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
              >
                {t("cta")}
                <ArrowRight className="h-[18px] w-[18px] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
