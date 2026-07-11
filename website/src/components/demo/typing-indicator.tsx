"use client";

import { useTranslations } from "next-intl";

export function TypingIndicator() {
  const t = useTranslations("demo");
  return (
    <div className="flex items-center gap-2 text-sm text-ink-soft">
      <span className="flex gap-1">
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent [animation-delay:200ms]" />
        <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent [animation-delay:400ms]" />
      </span>
      {t("thinking")}
    </div>
  );
}
