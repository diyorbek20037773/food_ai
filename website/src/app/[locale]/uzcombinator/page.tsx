import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale } from "next-intl/server";
import { Logo } from "@/components/site/logo";
import { TG_BOT_URL, PWA_URL } from "@/lib/links";
import { Trophy, Users, Rocket, ArrowUpRight, Send, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "FoodGPT × UzCombinator",
  description:
    "FoodGPT — O'zbekiston uchun AI ovqat hamrohi. UzCombinator 2026 arizasi.",
};

const TEAM = [
  { photo: "/team/zaxro.jpg", name: "Quvatova Zaxro", role: "Asoschi · CEO", bio: "Mahsulot va strategiya. EdTech Hackathon 2026 g'olibi." },
  { photo: "/team/dilshod.jpg", name: "Sultonov Dilshod", role: "Co-founder · Data Scientist", bio: "AI va ma'lumotlar. Green Tech Hackathon 2025 sovrindori." },
  { photo: "/team/shohruh.jpg", name: "Egamberganov Shohruh", role: "Co-founder · Full-stack Developer", bio: "Backend, ilova va infratuzilma." },
  { photo: "/team/nodirbek.jpg", name: "Ibragimov Nodirbek", role: "Co-founder · UI/UX Designer", bio: "Mahsulot dizayni va tajriba." },
];

export default async function UzCombinatorPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="relative overflow-hidden">
      {/* ambient warm wash */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 40% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="container-x">
        {/* ===== HERO ===== */}
        <header className="pt-16 pb-14 text-center md:pt-24">
          <div className="mb-6 flex justify-center">
            <Logo />
          </div>
          <span className="eyebrow justify-center">
            FoodGPT · UzCombinator 2026 arizasi
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(2.4rem,6vw,4rem)] font-bold leading-[1.05] text-ink">
            Salom, <span className="text-accent">UzCombinator</span>.
            <br />
            {"Biz FoodGPT'miz."}
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">
            {"O'zbekistonda odam ovqatlanmoqchi bo'lganda «bugun nima yeyman?» degan savolga tez javob yo'q. "}
            <b className="text-ink">FoodGPT</b>
            {" — tabiiy tilda so'raysiz, AI yaqin, ochiq va mos joyni topadi: bron, zakaz, navigatsiya bir oqimda."}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={TG_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-medium text-white shadow-glow transition-transform hover:-translate-y-0.5"
            >
              <Send className="h-[18px] w-[18px]" /> Mahsulotni sinash
            </a>
            <a
              href="#jamoa"
              className="inline-flex h-12 items-center gap-2 rounded-control border border-line-strong bg-surface px-6 font-medium text-ink shadow-soft transition-transform hover:-translate-y-0.5"
            >
              {"Jamoani ko'rish"}
            </a>
          </div>

          {/* traction badges */}
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Badge icon="🏆" num="1-o'rin" lab="EdTech Hackathon 2026" />
            <Badge icon="🥈" num="2-o'rin" lab="Green Tech Hackathon 2025" />
            <Badge icon="🚀" num="Live" lab="TG Mini App + PWA ishlaydi" />
          </div>
        </header>

        {/* ===== MUAMMO / YECHIM ===== */}
        <Section eyebrow="Muammo va yechim" title="Odam ovqatlanish joyi emas, tez qaror qidiradi">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-card-lg border border-line bg-surface p-8 shadow-soft">
              <p className="text-xs font-bold uppercase tracking-widest text-ink-mute">
                Hozir
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                5–10 daqiqa, 5 ta ilova
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Google Maps'da qidirish — data chala",
                  "Instagram'da menyu, Telegram'da narx qidirish",
                  "Bo'sh stol bormi deb telefon qilish",
                  "Yandex Go'ni alohida ochish",
                ].map((s) => (
                  <Bullet key={s} text={s} />
                ))}
              </ul>
            </div>
            <div className="rounded-card-lg border border-accent/40 bg-surface p-8 shadow-glow">
              <p className="text-xs font-bold uppercase tracking-widest text-accent-ink">
                FoodGPT bilan
              </p>
              <h3 className="mt-3 text-xl font-semibold text-ink">
                30 soniya, 1 ta suhbat
              </h3>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Tabiiy tilda yoki ovozda so'raysiz",
                  "AI real-time holat bilan mos joyni topadi",
                  "Bron, zakaz va yetkazish bir joyda",
                  "Moat — ovqatlanish joylari real-time data + bron infratuzilmasi",
                ].map((s) => (
                  <Bullet key={s} accent text={s} />
                ))}
              </ul>
            </div>
          </div>
        </Section>

        {/* ===== TRACTION ===== */}
        <Section eyebrow="Hozir qayerdamiz" title="Slayd emas — ishlaydigan mahsulot">
          <div className="grid gap-5 md:grid-cols-3">
            <Stat icon={Rocket} big="Live" cap="TG Mini App + PWA" sub="Ishlaydigan mahsulot, bugun sinash mumkin" />
            <Stat icon={Trophy} big="2×" cap="Xakaton g'olibligi" sub="EdTech 1-o'rin, Green Tech 2-o'rin" />
            <Stat icon={Users} big="5" cap="Asoschilar jamoasi" sub="AI, mahsulot, dizayn, tahlil" />
          </div>
        </Section>

        {/* ===== JAMOA ===== */}
        <Section id="jamoa" eyebrow="Jamoa" title="Nega aynan biz">
          <div className="grid gap-5 sm:grid-cols-2">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="flex items-center gap-4 rounded-card-lg border border-line bg-surface p-6 shadow-soft"
              >
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[16px] ring-1 ring-line">
                  <Image src={m.photo} alt={m.name} fill sizes="64px" className="object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-ink">{m.name}</p>
                  <p className="mt-0.5 text-[12px] font-semibold uppercase tracking-wide text-accent-ink">
                    {m.role}
                  </p>
                  <p className="mt-1 text-[13px] leading-snug text-ink-soft">
                    {m.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ===== HAVOLALAR ===== */}
        <Section eyebrow="Materiallar" title="Hammasi bir joyda">
          <div className="grid gap-4 sm:grid-cols-2">
            <LinkCard href={TG_BOT_URL} t="Telegram Mini App" s="@FoodGPT_uzbot — hoziroq sinang" />
            <LinkCard href={PWA_URL} t="PWA ilova" s="Brauzerda oching yoki o'rnating" />
          </div>
        </Section>

        {/* ===== FINAL ===== */}
        <div className="my-20 rounded-[28px] bg-ink px-8 py-14 text-center text-white md:px-12">
          <span className="eyebrow justify-center" style={{ color: "var(--amber)" }}>
            Nega aynan hozir
          </span>
          <h2 className="mx-auto mt-4 max-w-2xl text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold leading-tight">
            {"AI endi tabiiy tilni tushunadi, O'zbekistonda esa hali hech kim ovqatni bir joydan hal qilmaydi"}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">
            {"Google Maps'da ovqat izlash odati bu yerda shakllanmagan. Bu bo'shliq ochiq — lekin uzoq turmaydi. Biz yadroni — real-time data va bron infratuzilmasini — hozir qurmoqdamiz."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={TG_BOT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-control bg-accent px-6 font-medium text-white shadow-glow"
            >
              <Send className="h-[18px] w-[18px]" /> {"Telegram orqali bog'lanish"}
            </a>
            <a
              href="mailto:ubaydullayevgiyosiddin2003@gmail.com"
              className="inline-flex h-12 items-center gap-2 rounded-control border border-white/25 px-6 font-medium text-white transition-colors hover:border-accent"
            >
              <Mail className="h-[18px] w-[18px]" /> Email yozish
            </a>
          </div>
        </div>

        <footer className="pb-16 text-center text-[13px] tracking-wide text-ink-mute">
          {"FoodGPT — 2026 · Toshkent, O'zbekiston"}
        </footer>
      </div>
    </main>
  );
}

/* ---------- small presentational helpers ---------- */

function Section({
  eyebrow,
  title,
  children,
  id,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-20 border-t border-line py-16 md:py-20">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <span className="eyebrow justify-center">{eyebrow}</span>
        <h2 className="mt-3 text-[clamp(1.6rem,3.4vw,2.4rem)] font-bold text-ink">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

function Badge({ icon, num, lab }: { icon: string; num: string; lab: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface px-5 py-3 shadow-soft">
      <span className="grid h-9 w-9 place-items-center rounded-full bg-[color-mix(in_srgb,var(--accent)_14%,transparent)] text-base">
        {icon}
      </span>
      <div className="text-left">
        <div className="text-[17px] font-bold leading-tight text-ink">{num}</div>
        <div className="text-[10px] font-semibold uppercase tracking-widest text-ink-soft">
          {lab}
        </div>
      </div>
    </div>
  );
}

function Bullet({ text, accent }: { text: string; accent?: boolean }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] text-ink-soft">
      <span className={accent ? "font-bold text-accent" : "font-bold text-ink-mute"}>
        →
      </span>
      {text}
    </li>
  );
}

function Stat({
  icon: Icon,
  big,
  cap,
  sub,
}: {
  icon: typeof Rocket;
  big: string;
  cap: string;
  sub: string;
}) {
  return (
    <div className="rounded-card-lg border border-line bg-surface p-8 text-center shadow-soft">
      <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-[14px] bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div className="text-[38px] font-bold leading-none text-accent">{big}</div>
      <div className="mt-3 font-semibold text-ink">{cap}</div>
      <div className="mt-1 text-[13px] text-ink-soft">{sub}</div>
    </div>
  );
}

function LinkCard({ href, t, s }: { href: string; t: string; s: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between rounded-card border border-line bg-surface p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-accent/50"
    >
      <div>
        <div className="font-semibold text-ink">{t}</div>
        <div className="mt-0.5 text-[13px] text-ink-soft">{s}</div>
      </div>
      <ArrowUpRight className="h-5 w-5 text-accent" />
    </a>
  );
}
