"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

type Props = {
  posterSrc: string;
  embedUrl: string;
  title: string;
  watchLabel: string;
  badge: React.ReactNode;
};

export function NewsVideo({ posterSrc, embedUrl, title, watchLabel, badge }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-surface-2">
      {playing ? (
        <iframe
          src={embedUrl}
          title={title}
          allow="autoplay; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={watchLabel}
          className="group absolute inset-0 h-full w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
        >
          <Image
            src={posterSrc}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 900px"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-white shadow-glow transition-transform duration-200 group-hover:scale-110">
            <Play className="ml-0.5 h-7 w-7" fill="currentColor" />
          </span>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/55 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur-sm">
            {watchLabel}
          </span>
          {badge}
        </button>
      )}
    </div>
  );
}
