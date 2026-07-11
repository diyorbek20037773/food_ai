import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

export function Stats() {
  const t = useTranslations("stats");
  const items = t.raw("items") as { value: string; label: string }[];

  return (
    <section className="scroll-mt-24 py-20 md:py-28">
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

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={i} delay={0.05 * i}>
              <div className="h-full rounded-card border border-line bg-surface p-6 text-center shadow-soft">
                <div className="text-gradient text-[clamp(1.8rem,3vw,2.4rem)] font-bold tnum">
                  {item.value}
                </div>
                <p className="mt-2 text-[14px] leading-snug text-ink-soft">
                  {item.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-10 max-w-2xl text-center text-[15px] leading-relaxed text-ink-mute">
            {t("note")}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
