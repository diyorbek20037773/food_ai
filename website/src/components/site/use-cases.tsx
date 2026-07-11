import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

export function UseCases() {
  const t = useTranslations("useCases");
  const items = t.raw("items") as {
    emoji: string;
    title: string;
    desc: string;
  }[];

  return (
    <section className="band scroll-mt-24 border-y border-line py-20 md:py-28">
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

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={i} delay={0.04 * i}>
              <div className="group flex h-full items-start gap-4 rounded-card border border-line bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-surface-2 text-2xl transition-transform duration-300 group-hover:scale-110">
                  {item.emoji}
                </span>
                <div>
                  <h3 className="text-[17px] font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
