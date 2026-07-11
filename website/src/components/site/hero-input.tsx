"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { ArrowUp } from "lucide-react";

export function HeroInput() {
  const t = useTranslations("hero");
  const router = useRouter();
  const placeholders = t.raw("placeholders") as string[];
  const chips = t.raw("chips") as string[];

  const [ph, setPh] = useState(0);
  const [value, setValue] = useState("");
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    if (mq.matches) return;
    const id = setInterval(
      () => setPh((p) => (p + 1) % placeholders.length),
      2600,
    );
    return () => clearInterval(id);
  }, [placeholders.length]);

  function submit(q?: string) {
    const query = (q ?? value).trim();
    router.push(query ? `/demo?q=${encodeURIComponent(query)}` : "/demo");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <div className="group flex items-center gap-2 rounded-[20px] border border-line bg-surface p-2 pl-5 shadow-soft-lg transition-shadow focus-within:shadow-glow">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={reduce ? placeholders[0] : placeholders[ph]}
            aria-label={t("title")}
            className="h-11 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-mute"
          />
          <button
            type="submit"
            aria-label={t("send")}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-accent text-white shadow-glow transition-all hover:brightness-105 hover:-translate-y-px"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </form>

      <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {chips.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => submit(c.replace(/^\S+\s/, ""))}
            className="rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm text-ink-soft shadow-soft transition-all hover:-translate-y-px hover:text-ink"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
