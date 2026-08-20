"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { Reveal } from "./reveal";
import { DEMO_VIDEO_EMBED_URL, DEMO_VIDEO_THUMBNAIL_URL } from "@/lib/links";

export function DemoVideo() {
  const t = useTranslations("demoVideo");
  const [playing, setPlaying] = useState(false);

  return (
    <section className="container-x py-20 md:py-28">
      <Reveal className="mx-auto max-w-2xl text-center">
        <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
        <h2 className="text-[clamp(1.8rem,4vw,2.75rem)] font-bold leading-tight">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[17px] leading-relaxed text-ink-soft">
          {t("subtitle")}
        </p>
      </Reveal>

      <Reveal delay={0.08} className="mx-auto mt-10 w-full max-w-[360px]">
        <div className="relative aspect-[9/16] overflow-hidden rounded-card-lg border border-line bg-surface shadow-soft-lg">
          {playing ? (
            <iframe
              src={DEMO_VIDEO_EMBED_URL}
              title={t("title")}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label={t("watch")}
              className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
            >
              <Image
                src={DEMO_VIDEO_THUMBNAIL_URL}
                alt={t("title")}
                fill
                sizes="360px"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-glow transition-transform duration-200 group-hover:scale-110">
                <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
              </span>
            </button>
          )}
        </div>
      </Reveal>
    </section>
  );
}
