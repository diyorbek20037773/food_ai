import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "./reveal";

const PHOTOS = [
  "/team/zaxro.jpg",
  "/team/dilshod.jpg",
  "/team/shohruh.jpg",
  "/team/nodirbek.jpg",
  "/team/dilshoda.jpg",
];

export function Team() {
  const t = useTranslations("team");
  const members = t.raw("members") as {
    name: string;
    role: string;
    bio: string;
  }[];

  return (
    <section
      id="team"
      className="band scroll-mt-24 border-y border-line py-20 md:py-28"
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

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <Reveal key={m.name} delay={0.05 * i}>
              <div className="flex h-full items-center gap-4 rounded-card border border-line bg-surface p-5 shadow-soft">
                <div className="relative h-[68px] w-[68px] shrink-0 overflow-hidden rounded-[18px] ring-1 ring-line">
                  <Image
                    src={PHOTOS[i]}
                    alt={m.name}
                    fill
                    sizes="68px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="font-semibold text-ink">{m.name}</p>
                  <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide text-accent-ink">
                    {m.role}
                  </p>
                  <p className="mt-1.5 text-[13px] leading-snug text-ink-soft">
                    {m.bio}
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
