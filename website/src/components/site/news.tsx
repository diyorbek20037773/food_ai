import { useTranslations } from "next-intl";
import { Megaphone } from "lucide-react";
import { Reveal } from "./reveal";
import { NewsVideo } from "./news-video";
import { NEWS_UZC_VIDEO_EMBED_URL } from "@/lib/links";

export function News() {
  const t = useTranslations("news");

  return (
    <section id="news" className="band scroll-mt-24 border-y border-line py-20 md:py-28">
      <div className="container-x">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-tight">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={0.06} className="mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-card-lg border border-line bg-surface shadow-soft">
            <NewsVideo
              posterSrc="/news/uzcombinator-interview.jpg"
              embedUrl={NEWS_UZC_VIDEO_EMBED_URL}
              title={t("itemTitle")}
              watchLabel={t("watch")}
              badge={
                <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white shadow-glow">
                  <Megaphone className="h-3.5 w-3.5" />
                  {t("badge")}
                </span>
              }
            />
            <div className="p-6 md:p-8">
              <h3 className="text-[19px] font-semibold leading-snug text-ink">
                {t("itemTitle")}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {t("itemDesc")}
              </p>
              <p className="mt-3 text-[13px] font-medium text-ink-mute">
                #UzCombinator #startup #Uzbekistan
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
