# PWA — Implementatsiya rejasi

> Holat: 📋 rejalashtirilgan. Qoidalar: `./CLAUDE.md`. Strategiya: `../CLAUDE.md`.

## Context
FoodGPT'ning o'rnatiladigan veb-ilovasi — Telegram'i yo'q foydalanuvchilar va
home-screen uchun. website bilan bir xil Next.js stekida quriladi, shuning uchun
website komponentlari va design tizimi to'g'ridan-to'g'ri qayta ishlatiladi. Farqi —
app-shell tuzilishi (tab-bar), offline (service worker), o'rnatish (manifest), push.

## Bosqichlar

### Bosqich 1 — Next.js skeleton (website'dan meros)
- `pwa/` da Next.js 15 + TS + Tailwind + next-intl + next-themes o'rnatish.
- website'dan ko'chirish/moslashtirish: `globals.css` tokenlar, `lib/utils`,
  `Button`/`Card`/`Logo`, `messages/{uz,ru,en}.json`, `mock.ts`.
- `[locale]` routing (uz default) — website bilan bir xil.
- **Tekshiruv:** `npm run dev` → uz/ru/en + light/dark ishlaydi.

### Bosqich 2 — App-shell UX
- `layout.tsx`: app-shell (yuqori bar + pastki `TabBar`: Chat / Tavsiya / Profil).
- `ChatView`: "Nima yemoqchisiz?" input + suggestions (website demo bilan bir xil).
- `results/`: tavsiya kartalari (`RestaurantCard`). `profile/`: placeholder (tarix/sozlama).
- `standalone` rejim uchun safe-area CSS.
- **Tekshiruv:** tab navigatsiya, chat → mock tavsiya oqimi ishlaydi.

### Bosqich 3 — PWA qatlami (installable + offline)
- `app/manifest.ts`: FoodGPT nomi, `theme_color #FF6B35`, `background #FAFAF9`,
  `standalone`, ikonlar (192/512/maskable/apple-touch).
- Ikonlar: FoodGPT logo SVG'dan PNG generatsiya (`public/icons/`).
- Serwist (`@serwist/next`) sozlash: `sw.ts` — app-shell precache, runtime cache
  (data network-first, statik cache-first), `~offline` fallback.
- **Tekshiruv:** DevTools → Application: Manifest + SW ro'yxatdan o'tgan;
  Lighthouse PWA "installable" ✓; oflayn rejimda app ochiladi.

### Bosqich 4 — O'rnatish tajribasi + push (keyin)
- `InstallPrompt`: `beforeinstallprompt` ushlash, chiroyli "Ilovani o'rnatish" tugma;
  iOS uchun "Home screen'ga qo'shish" yo'riqnoma modal.
- (Keyin) Web Push (VAPID): bron eslatma, yangi joy. Faqat ruxsat bilan.
- **Tekshiruv:** Android/desktop'da o'rnatiladi; standalone'da to'g'ri ochiladi.

### Bosqich 5 (keyin) — Real backend
- Umumiy API (website/tg bilan): restoran data, tavsiya, bron, profil.
- Auth (telefon/Telegram login).

## Reuse (website'dan — bir xil stek, maksimal qayta ishlatish)
- Design tokenlar `globals.css`, UI primitivlar, `Logo`.
- i18n `messages/{uz,ru,en}.json`.
- `mock.ts` (restoran data + `matchRestaurants`).
- Demo chat oqimi mantiqi (`ChatDemo` → `ChatView`).

## Verification (umumiy)
`npm run build` toza · Lighthouse PWA (installable + offline) ✓ · uz/ru/en ·
light/dark · standalone'da tab-bar + safe-area · offline fallback ishlaydi.
