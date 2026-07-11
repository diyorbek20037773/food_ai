import { useTranslations } from "next-intl";
import { Send, Download } from "lucide-react";

export function Launch() {
  const t = useTranslations("launch");

  const cards = [
    {
      icon: Send,
      title: t("tgTitle"),
      desc: t("tgDesc"),
    },
    {
      icon: Download,
      title: t("pwaTitle"),
      desc: t("pwaDesc"),
    },
  ];

  return (
    <section id="launch" className="relative scroll-mt-20 py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
          <h2 className="text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold text-ink">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-2">
          {cards.map((c) => (
            <div
              key={c.title}
              className="group relative overflow-hidden rounded-card-lg border border-line bg-surface p-7 shadow-soft"
            >
              {/* warm corner wash */}
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(circle, color-mix(in srgb, var(--accent) 22%, transparent), transparent 70%)",
                }}
              />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-accent to-amber text-white shadow-glow">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <span className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent-ink">
                    {t("soon")}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">
                  {c.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
                  {c.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
