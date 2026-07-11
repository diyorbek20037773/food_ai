# Telegram Mini App — Implementatsiya rejasi

> Holat: 📋 rejalashtirilgan. Bu reja bosqichma-bosqich bajariladi.
> Qoidalar: `./CLAUDE.md`. Strategiya: `../CLAUDE.md`.

## Context
FoodGPT'ning asosiy iste'molchi kanali — Telegram Mini App. O'zbekistonda TG
dominant, shuning uchun bu website'dan ham muhimroq kanal. Website `/demo` oqimini
Telegram native tarzda qayta quramiz (mock data bilan boshlaymiz, keyin real API).

## Bosqichlar

### Bosqich 1 — Skeleton (SDK + native shell)
- `npm create vite@latest` (React + TS) `tg-mini-app/` ichida.
- O'rnatish: `@tma.js/sdk-react`, `@telegram-apps/telegram-ui`, `react-router-dom`,
  `react-i18next`, `i18next`.
- `init.ts`: SDK init (`debug`, `eruda`, `mockForMacOS`), komponentlarni mount
  (`backButton`, `initData`, `miniApp`, `themeParams`, `viewport`).
- `mockEnv.ts`: brauzerda test uchun TG muhitini mock (dev only).
- `Root.tsx` (ErrorBoundary) + `App.tsx` (launch params, theme, HashRouter, AppRoot).
- **Tekshiruv:** `npm run dev` → brauzerda mockEnv bilan ochiladi; Telegram theme
  o'zgaruvchilari ishlaydi.

### Bosqich 2 — Dizayn tizimi (FoodGPT ustiga TG UI)
- FoodGPT rang tokenlarini (`--accent: #FF6B35`, amber, success) global CSS'ga,
  TG `themeParams` o'zgaruvchilari bilan uyg'unlashtirish.
- `Logo`, `RestaurantCard` ni website'dan moslashtirish (Tailwind emas, TG UI + CSS).
- i18n: website `messages/{uz,ru,en}.json` ni qayta ishlatish (react-i18next formatiga).
- **Tekshiruv:** light/dark TG'da to'g'ri; orange urg'u ko'rinadi.

### Bosqich 3 — Asosiy oqim (mock)
- `ChatPage`: "Nima yemoqchisiz?" input + tayyor suggestions (website demo bilan bir xil).
- So'rov → mock `matchRestaurants()` → `ResultsPage` tavsiya kartalari.
- `RestaurantPage`: tafsilot + TG `MainButton` "Bron qilish" + `hapticFeedback`.
- Navigatsiya: har sahifada TG `BackButton`.
- Taxi/navigatsiya: `openLink` (Yandex Go deep-link) / `openTelegramLink`.
- **Tekshiruv:** to'liq oqim ChatPage → bron mockEnv'da ishlaydi.

### Bosqich 4 — Telegram integratsiya va deploy
- BotFather: `@FoodGPTBot` yaratish, Mini App URL ulash.
- Statik build → GitHub Pages yoki Cloudflare Pages'ga deploy.
- Haqiqiy Telegram klientida sinash (iOS/Android/Desktop/macOS).
- **Tekshiruv:** haqiqiy TG'da ochiladi, native his to'liq.

### Bosqich 5 (keyin) — Real backend
- Umumiy API (website bilan): restoran data, tavsiya, bron.
- **initData server validatsiyasi** (bot token HMAC) — auth.
- TON Connect / Telegram Payments (kerak bo'lsa).

## Reuse (website'dan)
- `website/src/lib/mock.ts` → mock restoran data + `matchRestaurants`.
- `website/messages/{uz,ru,en}.json` → i18n matnlari.
- Design tokenlar (`website/src/app/globals.css`) → rang qiymatlari.
- Restoran karta va logotip tuzilishi.

## Verification (umumiy)
`npm run build` toza · uz/ru/en · TG light/dark · mockEnv'da to'liq oqim ·
haqiqiy Telegram klientida native shell (BackButton/MainButton/haptic/theme).
