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
ochadi → "Ochish" → Mini App. Oqim:

```
Lokatsiyani yoqadi (TG location)  →  koordinata
  → "Nima yemoqchisiz?" (matn YOKI ovoz)
  → backend (Gemini niyat + geo qidiruv)
  → YAQIN ovqatlanish joylari kartalari (masofa/narx/holat)
  → bron / navigatsiya / taxi   + AI javobi ovozda (TTS/realtime)
```

Native: BackButton, MainButton, theme, haptic, initData auth. **Barcha AI/voice/geo
mantiqi backend'da** (`../backend`) — mijoz faqat API'ga so'rov yuboradi, kalit yo'q.

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

## 3b. Geolokatsiya, ovoz va backend (MUHIM)

**Geo (yaqin joylar):**
- Lokatsiya TG'dan olinadi: `requestLocation()` / `LocationManager` (SDK). Ruxsat
  so'raladi, rad etilsa — qo'lda shahar/tuman tanlash fallback.
- Koordinata backend `POST /api/nearby` yoki `/api/chat` ga yuboriladi.
- **Saralash backend'da** (masofa/ochiq/mos) — mijoz faqat ko'rsatadi. Har kartada
  masofa, "🟢 ochiq · ~15 daq", narx, ⭐.

**Ovoz (voice):**
- TG mikrofon ruxsati bilan audio yozib olinadi. Ikki rejim (backend abstract layer):
  - **Realtime (primary):** `WS /api/voice/live` — audio stream ↔ AI ovozli javob.
  - **Pipeline (fallback):** audio → `POST /api/voice` → transkript + ovozli javob.
- Rejim backend `VOICE_PROVIDER` bilan; mijoz ikkalasini ham qo'llab-quvvatlaydi,
  ishlamasa **matn kiritishga** tushadi (voice — qulaylik, majburiy emas).
- `hapticFeedback` yozish boshlanishi/tugashida.

**Backend ulanish:**
- Barcha so'rovlar `../backend` API'ga (`VITE_API_URL` env). **Hech qanday Gemini/voice
  kaliti mijozda YO'Q.**
- initData (`initDataRaw`) har so'rovda backend'ga yuboriladi → server HMAC validatsiya.
- Restoran obyekt shakli backend bilan bir xil (`{id,name,dish,km,rating,priceFrom,
  waitMin,ready}`) — website `mock.ts` bilan mos.

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
    ChatPage.tsx       # asosiy "Nima yemoqchisiz?" ekrani (matn + mikrofon)
    ResultsPage.tsx    # yaqin joylar kartalari (backend'dan)
    RestaurantPage.tsx # bir joy tafsiloti + bron
  components/
    VoiceButton.tsx    # mikrofon: yozish → realtime/pipeline
    LocationGate.tsx   # lokatsiya ruxsati / fallback
  services/
    api.ts             # backend REST (chat, nearby, reserve) — VITE_API_URL
    voiceClient.ts     # WS realtime + pipeline fallback
  navigation/routes.tsx
  i18n/                # uz/ru/en
  lib/mock.ts          # backend yo'q paytda dev mock (website'dan)
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
- [ ] Lokatsiya → yaqin joylar ko'rinadi (masofa bo'yicha)
- [ ] Ovoz: realtime yoki pipeline ishlaydi; ishlamasa matn'ga tushadi
- [ ] uz/ru/en + TG light/dark
- [ ] ChatPage → backend tavsiya → bron oqimi (backend yo'q paytda mock)
- [ ] `npm run build` toza, statik dist deploy bo'ladi
- [ ] initData server validatsiyasi (auth bosqichida)
