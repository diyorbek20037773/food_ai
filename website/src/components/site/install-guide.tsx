import { useTranslations } from "next-intl";
import { Send, Smartphone, Apple, Info } from "lucide-react";
import { TG_BOT_URL } from "@/lib/links";

export function InstallGuide() {
  const t = useTranslations("install");

  const tgSteps = t.raw("tg.steps") as string[];
  const androidSteps = t.raw("android.steps") as string[];
  const iosSteps = t.raw("ios.steps") as string[];

  return (
    <section id="install" className="band scroll-mt-20 border-y border-line py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow mb-4 justify-center">{t("eyebrow")}</span>
          <h2 className="text-[clamp(1.7rem,3.6vw,2.6rem)] font-bold text-ink">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[17px] leading-relaxed text-ink-soft">
            {t("subtitle")}
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-3">
          {/* Telegram — easiest */}
          <a
            href={TG_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-card-lg border border-accent/30 bg-surface p-7 shadow-soft ring-1 ring-accent/10 transition-all hover:-translate-y-1 hover:shadow-soft-lg"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-gradient-to-br from-accent to-amber text-white shadow-glow">
                <Send className="h-5 w-5" />
              </span>
              <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] px-3 py-1 text-xs font-semibold text-accent-ink">
                {t("tg.badge")}
              </span>
            </div>
            <h3 className="mt-5 text-lg font-semibold text-ink">
              {t("tg.title")}
            </h3>
            <ol className="mt-4 flex flex-col gap-3">
              {tgSteps.map((s, i) => (
                <Step key={i} n={i + 1} text={s} />
              ))}
            </ol>
          </a>

          {/* Android */}
          <div className="flex flex-col rounded-card-lg border border-line bg-surface p-7 shadow-soft">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-surface-2 text-ink">
              <Smartphone className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">
              {t("android.title")}
            </h3>
            <ol className="mt-4 flex flex-col gap-3">
              {androidSteps.map((s, i) => (
                <Step key={i} n={i + 1} text={s} />
              ))}
            </ol>
          </div>

          {/* iOS */}
          <div className="flex flex-col rounded-card-lg border border-line bg-surface p-7 shadow-soft">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-[16px] bg-surface-2 text-ink">
              <Apple className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-ink">
              {t("ios.title")}
            </h3>
            <p className="mt-3 flex items-start gap-2 rounded-[12px] bg-[color-mix(in_srgb,var(--amber)_14%,transparent)] px-3 py-2 text-[13px] font-medium text-ink-soft">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
              {t("ios.note")}
            </p>
            <ol className="mt-4 flex flex-col gap-3">
              {iosSteps.map((s, i) => (
                <Step key={i} n={i + 1} text={s} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function Step({ n, text }: { n: number; text: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="tnum mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[12px] font-bold text-accent-ink">
        {n}
      </span>
      <span className="text-[14.5px] leading-relaxed text-ink-soft">{text}</span>
    </li>
  );
}
