"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, Sparkles, CheckCircle2 } from "lucide-react";
import { matchRestaurants, type Restaurant } from "@/lib/mock";
import { RestaurantCard } from "./restaurant-card";
import { TypingIndicator } from "./typing-indicator";

type Message =
  | { role: "user"; text: string; id: number }
  | { role: "ai"; intro: string; results: Restaurant[]; id: number };

export function ChatDemo() {
  const t = useTranslations("demo");
  const searchParams = useSearchParams();
  const suggestions = t.raw("suggestions") as string[];

  const [messages, setMessages] = useState<Message[]>([]);
  const [value, setValue] = useState("");
  const [thinking, setThinking] = useState(false);
  const [toast, setToast] = useState(false);
  const idRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const send = useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text || thinking) return;
      setValue("");
      const userId = idRef.current++;
      setMessages((m) => [...m, { role: "user", text, id: userId }]);
      setThinking(true);

      const timer = setTimeout(() => {
        setThinking(false);
        setMessages((m) => [
          ...m,
          {
            role: "ai",
            intro: t("aiIntro"),
            results: matchRestaurants(text),
            id: idRef.current++,
          },
        ]);
      }, 1100);
      timers.current.push(timer);
    },
    [thinking, t],
  );

  // Prefill from ?q= (coming from the hero)
  const didPrefill = useRef(false);
  useEffect(() => {
    if (didPrefill.current) return;
    const q = searchParams.get("q");
    if (q) {
      didPrefill.current = true;
      send(q);
    }
  }, [searchParams, send]);

  // Auto-scroll to bottom on new content
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, thinking]);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach(clearTimeout);
  }, []);

  function reserve() {
    setToast(true);
    const timer = setTimeout(() => setToast(false), 2200);
    timers.current.push(timer);
  }

  const empty = messages.length === 0 && !thinking;

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col">
      {/* Conversation */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-5 overflow-y-auto px-1 pb-4"
      >
        {empty && (
          <div className="flex flex-col items-center pt-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-gradient-to-br from-accent to-amber text-white shadow-glow">
              <Sparkles className="h-7 w-7" />
            </div>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
              {t("subtitle")}
            </p>
            <div className="mt-6 flex w-full flex-col gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-control border border-line bg-surface px-4 py-3 text-left text-[15px] text-ink shadow-soft transition-all hover:-translate-y-px hover:shadow-soft-lg"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) =>
          msg.role === "user" ? (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-[18px] rounded-br-md bg-accent px-4 py-2.5 text-[15px] text-white shadow-glow">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={msg.id} className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-ink-soft">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                </span>
                FoodGPT
              </div>
              <p className="text-[15px] leading-relaxed text-ink">{msg.intro}</p>
              <div className="flex flex-col gap-3">
                {msg.results.map((r, i) => (
                  <RestaurantCard
                    key={r.id}
                    r={r}
                    index={i}
                    onReserve={reserve}
                  />
                ))}
              </div>
            </div>
          ),
        )}

        {thinking && (
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)]">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
            </span>
            <TypingIndicator />
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(value);
        }}
        className="sticky bottom-0 mt-2 bg-bg pt-2"
      >
        <div className="flex items-center gap-2 rounded-[20px] border border-line bg-surface p-2 pl-5 shadow-soft-lg transition-shadow focus-within:shadow-glow">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={t("inputPh")}
            aria-label={t("inputPh")}
            className="h-11 flex-1 bg-transparent text-[16px] text-ink outline-none placeholder:text-ink-mute"
          />
          <button
            type="submit"
            disabled={!value.trim() || thinking}
            aria-label={t("send")}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-accent text-white shadow-glow transition-all hover:brightness-105 disabled:opacity-40 disabled:shadow-none"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
        <p className="mt-2 text-center text-xs text-ink-mute">
          {t("disclaimer")}
        </p>
      </form>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
          >
            <div className="flex items-center gap-2 rounded-full border border-line bg-surface px-4 py-2.5 text-sm font-medium text-ink shadow-soft-lg">
              <CheckCircle2 className="h-4 w-4 text-success" />
              {t("reserved")}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
