# FoodGPT — Telegram Mini App (CLAUDE.md)

> Bu papka FoodGPT'ning **asosiy iste'molchi kanali**. O'zbekistonda Telegram
> dominant — ilova aynan shu yerda "yashaydi". Root `../CLAUDE.md` strategiya va
> umumiy dizayn tilini belgilaydi; bu fayl TG-specific qoidalar.
>
> **Holat: 📋 rejalashtirilgan.** Kod hali yozilmagan. `PLAN.md` ni bajarish rejasi
> sifatida o'qing.

---

## 1. Nima quramiz

Telegram ichida native his beruvchi Mini App: foydalanuvchi `@FoodGPTBot` ni
ochadi → "Ochish" tugmasi → Mini App ishga tushadi. Ekran: ChatGPT-vari
"Nima yemoqchisiz?" input → AI tavsiya kartalari → **bron / navigatsiya / taxi**.
Website `/demo` bilan bir xil oqim, lekin Telegram native (BackButton, MainButton,
theme, haptic, initData auth).

## 2. Texnologiya steki

| Qatlam | Tanlov | Sabab |
|--------|--------|-------|
| Bundler | **Vite** | TG Mini App standarti, tez |
| Framework | **React 18 + TypeScript** | website bilan bir xil model |
| TG SDK | **@tma.js/sdk-react** (v3) | rasmiy, hook-based |
| UI kit | **@telegram-apps/telegram-ui** | native TG komponentlar |
| Routing | **react-router (HashRouter)** | TG WebView faqat hash bilan ishlaydi |
| i18n | **react-i18next** (uz/ru/en) | Next yo'q, shuning uchun bu |
| Data | website bilan umumiy **REST/tRPC API** (keyin) | mock bilan boshlanadi |
| To'lov (keyin) | TON Connect / Telegram Payments | template'da bor |

> **DIQQAT:** Next.js EMAS. TG Mini App — SPA, statik hosting (CDN). SSR yo'q.

## 3. TG-specific qoidalar (MUHIM)
- **initData validatsiyasi SERVER tomonda majburiy** — `initDataRaw` ni backend
  bot tokeni bilan HMAC tekshiradi. Client'dagi user'ga ishonmang. (Auth qo'shilganda.)
- **Theme:** TG `themeParams` dan light/dark aniqlanadi — o'z toggle'imiz shart emas,
  lekin FoodGPT rang tokenlarini TG CSS o'zgaruvchilari ustiga moslashtiramiz.
- **Navigatsiya:** har sahifada TG `BackButton` (SDK), brauzer tugmasi emas.
- **Asosiy amal:** TG `MainButton` (masalan "Bron qilish") — sahifa ichidagi tugma emas.
- **Haptic feedback:** muhim amallarda (bron tasdiqlash) `hapticFeedback`.
- **Tashqi havola:** taxi/navigatsiya `openLink` / `openTelegramLink` orqali.
- **Viewport:** `viewport.expand()`, safe-area CSS o'zgaruvchilari hurmat qilinadi.
- **Platform workaround:** macOS uchun `mockForMacOS`, iOS/Android debug uchun Eruda.

## 4. Dizayn
Root design tili (Apple × ChatGPT, orange urg'u) — lekin TG UI komponentlari ustida.
FoodGPT tokenlarini (`--accent: #FF6B35`) TG theme o'zgaruvchilariga bog'laymiz.
website'dagi `Logo`, restoran karta tuzilishi, i18n matnlarini qayta ishlatamiz.

## 5. Fayl tuzilishi (reja)
```
src/
  index.tsx            # entry: TG UI styles, init(), Root render
  init.ts              # SDK init (debug, eruda, mockForMacOS, mount components)
  mockEnv.ts           # dev'da TG muhitini mock qilish (brauzerda test)
  components/
    Root.tsx           # ErrorBoundary + (TonConnect) provider
    App.tsx            # launch params, theme, HashRouter
    RestaurantCard.tsx # website'dan moslashtirilgan
  pages/
    ChatPage.tsx       # asosiy "Nima yemoqchisiz?" ekrani
    ResultsPage.tsx    # AI tavsiya kartalari
    RestaurantPage.tsx # bir joy tafsiloti + bron
  navigation/routes.tsx
  i18n/                # uz/ru/en
  lib/mock.ts          # website mock data
```

## 6. Buyruqlar (reja)
```
npm install
npm run dev            # Vite (brauzerda mockEnv bilan)
npm run build          # statik dist/
npm run deploy         # GitHub Pages / CDN (keyin sozlanadi)
```
Bot: BotFather'da Mini App URL ni ulash.

## 7. Tugallanish mezoni
- [ ] Telegram ichida ochiladi, native his (BackButton, MainButton, theme, haptic)
- [ ] uz/ru/en + TG light/dark
- [ ] ChatPage → mock tavsiya → bron oqimi ishlaydi
- [ ] `npm run build` toza, statik dist deploy bo'ladi
- [ ] initData server validatsiyasi (auth bosqichida)
