import Image from "next/image";
import { useTranslations } from "next-intl";
import { Trophy } from "lucide-react";
import { Reveal } from "./reveal";

const PHOTOS = ["/achievements/edtech.jpg", "/achievements/greentech.jpg"];

export function Achievements() {
  const t = useTranslations("achievements");
  const items = t.raw("items") as {
    place: string;
    title: string;
    desc: string;
  }[];

  return (
    <section
      id="achievements"
      className="scroll-mt-24 py-20 md:py-28"
    >
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

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 md:grid-cols-2">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={0.06 * i}>
              <div className="flex h-full flex-col overflow-hidden rounded-card-lg border border-line bg-surface shadow-soft">
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
                  <Image
                    src={PHOTOS[i]}
                    alt={it.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                  />
                  <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-glow">
                    <Trophy className="h-3.5 w-3.5" />
                    {it.place}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-[17px] font-semibold text-ink">
                    {it.title}
                  </h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                    {it.desc}
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
