# FoodGPT — Loyiha yo'riqnomasi (CLAUDE.md)

> Bu fayl loyihaning yagona haqiqat manbai. Har qanday kod yozishdan oldin shuni o'qing.
> Til: kod/kommentlar inglizcha; UI matnlari uz/ru/en (i18n orqali).

---

## 1. Loyiha nima

**FoodGPT** — AI orqali «bugun nima yeyman?» savolini hal qiluvchi O'zbekiston
**ovqatlanish joylari** platformasi (restoran, kafe, choyxona — kengroq). Foydalanuvchi
tabiiy tilda yozadi/gapiradi → AI yaqin, ochiq, mos joyni topadi → **bron**, **zakaz +
yetkazish**, **navigatsiya**, **taxi** bir oqimda.

**Strategik pozitsiya (muhim):** bu «AI restoran qidiruvi» EMAS. Yadro qiymat va
himoya (moat) — **ovqatlanish joylarining real-time data + bron infratuzilmasi**
(OpenTable yo'li). AI — eshik, data — uy.

**So'z tanlash (MUHIM):** «restoran» EMAS → **«ovqatlanish joylari»** (uz) · **«заведения»**
(ru) · **«venues / places to eat»** (en). Restoran tor doira.

**Delivery modeli:** zakaz + to'lov FoodGPT'da (bizning yadro), **yetkazish esa
ovqatlanish joyi yoki hamkor kuryer** orqali — FoodGPT o'zi yetkazmaydi.

**Insayt:** O'zbekistonda odam Google Maps'ga kirib ovqat izlamaydi — bu bo'shliqni
FoodGPT to'ldiradi.

### Holat va roadmap
- **Website ✅ QURILGAN va DEPLOY.** Info-only marketing sayt (chat/ilova EMAS — u
  alohida repoda: `food_gpttgminiapppwa`). `/demo` sahifasi O'CHIRILGAN.
- **Ilova ✅ ISHLAYDI:** Telegram Mini App = PWA (bitta React + FastAPI), alohida repo
  `github.com/diyorbek20037773/food_gpttgminiapppwa`. Website'dan havola qilinadi:
  TG bot `t.me/FoodGPT_uzbot`, PWA Railway domeni (`src/lib/links.ts`).
- **Keyin:** ovqatlanish joylari uchun B2B dashboard, real POS integratsiya.

**Website bo'limlari (hozirgi):** Hero (app CTA + YC havola) · Muammo→Yechim · Funksiyalar
· Qanday ishlaydi · Demo video (placeholder) · Statistika · Kim uchun (use-case) ·
Texnologiya · Ovqatlanish joylari uchun (B2B) · Launch (TG/PWA havola) · **Qanday
o'rnatiladi** (TG/Android/iOS) · **Jamoa** (5 real a'zo, rasm) · **Yutuqlar** (2 xakaton)
· Aloqa · Footer. Alohida sahifa: **`/uzcombinator`** (YC arizasi).

---

## 2. Texnologiya steki

| Qatlam | Tanlov |
|--------|--------|
| Framework | **Next.js 15** (App Router, TypeScript) |
| Styling | **Tailwind CSS** + CSS custom properties (design tokenlar) |
| UI komponentlar | **shadcn/ui** uslubi (Radix + Tailwind), `src/components/ui/` |
| i18n | **next-intl** (uz default, ru, en) |
| Theme | **next-themes** (light/dark, tizim + toggle) |
| Animatsiya | **Framer Motion** |
| Ikonlar | **lucide-react** |
| Font | **Inter** (`next/font`, self-host — CDN yo'q) |

Paket menejeri: **npm**. Node ≥ 20.

---

## 3. Dizayn tizimi — MUHIM, qat'iy amal qiling

**Estetika:** Apple × ChatGPT × Airbnb × Linear. Premium AI + warm minimalism.
Venture-backed Silicon Valley startup, Apple Design Award darajasi.

**QOCHISH:** delivery-marketplace ko'rinishi (Yandex Eats / Uber Eats), chegirma
bannerlari, qizil ustunligi, og'ir gradientlar, siqiq layout, neon/futuristik AI
dashboard, ortiqcha animatsiya.

**HIS:** iliq · aqlli · ishonchli · premium · zamonaviy · mazali.

### 3.1 Rang tokenlari

Barcha ranglar CSS custom property orqali (`globals.css`). Komponentlar tokendan
foydalanadi, hex to'g'ridan-to'g'ri yozilmaydi.

**Light (default):**
```
--bg:        #FAFAF9   /* iliq oq — pure white emas, orange tomon mikro-bias */
--surface:   #FFFFFF   /* kartalar */
--surface-2: #F5F4F2   /* ikkilamchi yuza */
--ink:       #111827   /* charcoal matn */
--ink-soft:  #6B7280   /* ikkilamchi matn */
--ink-mute:  #9CA3AF   /* caption/placeholder */
--accent:    #FF6B35   /* orange — YAGONA birlamchi urg'u */
--accent-ink:#E24A16   /* orange ustidagi to'q variant (matn/hover) */
--amber:     #FFB703   /* highlight, gradient sherigi */
--success:   #22C55E   /* faqat ochiq/tayyor/yangi holat — urg'u EMAS */
--line:      rgba(17,24,39,.08)   /* minimal chegara */
--ring:      rgba(255,107,53,.45) /* focus halqa */
```

**Dark:** naiv invert QILMANG — kontrast qayta sozlangan:
```
--bg:        #0E0F11   /* chuqur ko'mir */
--surface:   #17181B
--surface-2: #1E2024
--ink:       #F5F4F2
--ink-soft:  #A1A1AA
--ink-mute:  #71717A
--accent:    #FF7A47   /* dark fonda biroz yumshatilgan orange */
--accent-ink:#FF6B35
--amber:     #F5A800
--success:   #34D399
--line:      rgba(255,255,255,.09)
--ring:      rgba(255,122,71,.5)
```

**Qoida:** orange = yagona urg'u. Yashil faqat semantik (ochiq/tayyor). Neytrallar
iliq (orange tomon mikro-bias), pure grey emas.

### 3.2 Tipografiya
- Shrift: **Inter** (barcha rollar). Raqamlar/statistika: `font-variant-numeric: tabular-nums`.
- Type scale (mobil → desktop `clamp`): display 44–72 / h1 32–44 / h2 24–32 /
  h3 18–20 / body 16 / small 14 / caption 12.
- Sarlavhalar: `text-wrap: balance`, `letter-spacing: -0.02em`, weight 600–700.
- Body: line-height 1.6, o'qish kengligi ~65ch.
- Uppercase yorliqlar (eyebrow): letter-spacing 0.12em, weight 600, kichik.

### 3.3 Shakl va fazo
- **Radius:** kartalar `20–24px`, tugma/input `12–14px`, pill `9999px`.
- **Soya:** yumshoq, ko'p qatlamli, past opacity (delivery-app «hard shadow» EMAS).
  Masalan: `0 1px 2px rgba(17,24,39,.04), 0 8px 24px rgba(17,24,39,.06)`.
- **Bo'sh joy:** juda saxiy. Bo'lim padding `py-20 md:py-28`. 8px grid.
- **Chegara:** minimal — soya va fon farqiga tayan, ko'p chiziq EMAS.
- **Glassmorphism:** faqat ierarxiya yaxshilaganda (masalan sticky nav blur).

### 3.4 Animatsiya (Framer Motion)
- Kirish: fade + kichik `y` (12–16px) siljish, scroll-reveal (`whileInView`, `once`).
- Hover: nozik ko'tarilish/scale (1.02), 150–200ms, `ease-out`.
- Hero input: placeholder matnlar aylanadi (typewriter/rotate).
- `prefers-reduced-motion` HURMAT qilinadi — animatsiya o'chadi.
- Kam = ko'p. Ortiqcha effekt AI-generatsiya hissini beradi.

---

## 4. Fayl tuzilishi

```
CLAUDE.md
package.json  tsconfig.json  next.config.mjs  tailwind.config.ts  postcss.config.mjs
messages/{uz,ru,en}.json           # barcha UI matnlari
src/
  i18n/routing.ts  request.ts       # next-intl config
  middleware.ts                      # locale routing
  app/
    [locale]/
      layout.tsx                     # <html lang>, theme+intl provider, font
      page.tsx                       # LANDING (barcha bo'limlar shu yerda)
      uzcombinator/page.tsx          # YC ARIZA SAHIFASI (standalone)
    globals.css                      # tokenlar + base (iliq krem + warm-canvas)
  components/
    ui/                              # button, card, badge
    site/                            # Nav, Hero, ProblemSolution, Features, HowItWorks,
                                     #   Stats, UseCases, Tech, ForRestaurants, DemoVideo,
                                     #   Launch, InstallGuide, Team, Achievements, Contact,
                                     #   Footer, LanguageSwitcher, ThemeToggle, Logo, Reveal
  lib/
    utils.ts                         # cn()
    links.ts                         # TG_BOT_URL, PWA_URL (jonli app havolalar)
public/
  team/*.jpg  achievements/*.jpg     # jamoa va yutuq rasmlari
  favicon.svg
```

> `/demo` sahifa va `components/demo/`, `lib/mock.ts` OLIB TASHLANGAN — chat/ilova
> alohida repoda (`food_gpttgminiapppwa`). Website faqat ma'lumot.

---

## 5. i18n qoidalari
- **Default:** inglizcha (`en`). URL: `/` → en, `/uz`, `/ru` (locale prefix `as-needed`).
- **Hech qanday matn kodda hardcode QILINMAYDI** — barchasi `messages/{locale}.json`.
- Kalitlar bo'limlar bo'yicha nested: `nav.*`, `hero.*`, `features.*`, `demo.*`...
- Uch til ham to'liq to'ldiriladi (bo'sh string yo'q).
- `LanguageSwitcher` locale'ni almashtiradi, joriy yo'lni saqlaydi.

---

## 6. Kod konvensiyalari
- TypeScript strict. `any` dan qoching.
- Server Component default; `"use client"` faqat kerak bo'lganda (interaktivlik, motion, theme).
- Klasslar `cn()` (clsx + tailwind-merge) orqali birlashtiriladi.
- Ranglar/o'lchamlar — Tailwind token yoki CSS var; sehrli hex yo'q.
- Har interaktiv element: ko'rinadigan `focus-visible` holati, `aria` label.
- Rasm: `next/image`, `alt` majburiy.
- Copy: foydalanuvchi tilida, faol nisbat, aniq (tugma nima qilsa shuni aytadi).

---

## 7. Buyruqlar
```
npm install        # bog'liqliklar
npm run dev        # http://localhost:3000
npm run build      # prod build (TS+lint toza bo'lishi shart)
npm run lint       # eslint
```

## 8. Tugallanish mezoni (har bir ish uchun)
- [ ] uz/ru/en — matn to'g'ri, bo'sh string yo'q
- [ ] light/dark — ikkala tema ham to'g'ri, kontrast yetarli
- [ ] Responsive — 375px va 1440px'da buzilmaydi, gorizontal scroll yo'q
- [ ] `npm run build` xatosiz
- [ ] focus/aria holati bor, `prefers-reduced-motion` hurmat qilinadi
- [ ] Delivery-app estetikasi YO'Q; orange yagona urg'u
