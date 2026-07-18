"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle2 } from "lucide-react";
import { CONTACT_TG_HANDLE, CONTACT_TG_URL } from "@/lib/links";

export function Contact() {
  const t = useTranslations("contact");
  const [sent, setSent] = useState(false);

  const inputCls =
    "h-12 w-full rounded-control border border-line bg-surface px-4 text-[15px] text-ink outline-none transition-shadow placeholder:text-ink-mute focus:shadow-glow";

  return (
    <section id="contact" className="container-x scroll-mt-24 py-20 md:py-28">
      <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:gap-14">
        <Reveal>
          <span className="eyebrow mb-4">{t("eyebrow")}</span>
          <h2 className="text-[clamp(1.8rem,4vw,2.5rem)] font-bold leading-tight">
            {t("title")}
          </h2>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-ink-soft">
            {t("subtitle")}
          </p>

          <div className="mt-8">
            <p className="text-sm text-ink-mute">{t("or")}</p>
            <a
              href={CONTACT_TG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-[15px] font-medium text-accent-ink hover:underline"
            >
              <Send className="h-4 w-4" />
              {CONTACT_TG_HANDLE}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="rounded-card-lg border border-line bg-surface p-6 shadow-soft md:p-7"
          >
            {sent ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center">
                <CheckCircle2 className="h-12 w-12 text-success" />
                <p className="mt-4 text-lg font-semibold">{t("sent")}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink-soft">
                    {t("name")}
                  </span>
                  <input
                    required
                    className={inputCls}
                    placeholder={t("namePh")}
                    autoComplete="name"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink-soft">
                    {t("email")}
                  </span>
                  <input
                    required
                    type="email"
                    className={inputCls}
                    placeholder={t("emailPh")}
                    autoComplete="email"
                  />
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-ink-soft">
                    {t("message")}
                  </span>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none rounded-control border border-line bg-surface px-4 py-3 text-[15px] text-ink outline-none transition-shadow placeholder:text-ink-mute focus:shadow-glow"
                    placeholder={t("messagePh")}
                  />
                </label>
                <Button type="submit" size="lg" className="mt-1 w-full">
                  <Send className="h-4 w-4" />
                  {t("send")}
                </Button>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
