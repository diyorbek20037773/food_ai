# FoodGPT — Monorepo (CLAUDE.md)

> Bu **root** yo'riqnoma. Har bir loyihaning o'z `CLAUDE.md` si bor — o'sha papkada
> ishlaganda avval o'shani o'qing. Bu fayl umumiy strategiya, tuzilish va
> loyihalararo umumiy qoidalarni belgilaydi.

---

## 1. FoodGPT nima

**FoodGPT** — AI orqali «bugun nima yeyman?» savolini hal qiluvchi O'zbekiston
restoran platformasi. Foydalanuvchi tabiiy tilda so'raydi → AI yaqin, ochiq, mos
joyni topadi → **bron**, **navigatsiya**, **taxi** bir oqimda.

**Strategik pozitsiya (o'zgarmas):** bu «AI restoran qidiruvi» EMAS. Yadro qiymat
va himoya (moat) — **restoranlarning real-time data + bron infratuzilmasi**
(OpenTable yo'li). AI — eshik, data — uy.

**Insayt:** O'zbekistonda odam Google Maps'ga kirib ovqat izlamaydi — shu bo'shliqni
FoodGPT to'ldiradi.

---

## 2. Repo tuzilishi — IKKI ALOHIDA REPO (yangilangan)

Dastlab monorepo rejalashtirilgandi, lekin amalda **ikki mustaqil GitHub repo** qurildi:

| Repo | Nima | Holat |
|------|------|-------|
| **`food_ai`** (`github.com/diyorbek20037773/food_ai`) — SHU repo | Marketing **website** (Next.js). Info-only, chat/ilova YO'Q. | ✅ Qurilgan, deploy |
| **`food_gpttgminiapppwa`** (`github.com/diyorbek20037773/food_gpttgminiapppwa`) | **Ilova:** Telegram Mini App = PWA (bitta React frontend + FastAPI backend, bitta server). | ✅ Ishlaydi, deploy |

Bu `food_ai` repo tuzilishi (website):
```
food_ai/  (= restaurant_ai lokal papka)
├── CLAUDE.md          # SHU FAYL
├── README.md
├── website/           # ✅ Next.js marketing sayt — CLAUDE.md o'sha yerda
└── founders/          # jamoa rasmlari + YC template (manba; website/public'ga ko'chirilgan)
```

> **Eskirgan papkalar:** `backend/`, `tg-mini-app/`, `pwa/` (CLAUDE.md + PLAN.md) — bu
> lokal papkada hali bor, lekin **ular reja edi**. Haqiqiy ilova va backend
> `food_gpttgminiapppwa` repoda qurildi (Node+Fastify emas — **Python+FastAPI**,
> TG=PWA bitta frontend). Yangi ish uchun o'sha repo va uning CLAUDE.md'siga qarang.

**Ilova arxitekturasi (qisqacha):** TG Mini App va PWA = bir xil React frontend
(`window.Telegram` bo'lsa TG rejim, bo'lmasa PWA). Bitta FastAPI process: API + TG bot
(polling) + frontend serve + admin. Gemini AI, ovoz (pipeline), geo, auth (parolsiz),
bron/zakaz. Batafsil: `food_gpttgminiapppwa/CLAUDE.md`.

**Website ↔ ilova:** website statik marketing (backend'siz); ilovaga havola qiladi
(`website/src/lib/links.ts` → TG bot + PWA URL). Ilova alohida repoda mustaqil ishlaydi.

---

## 3. Umumiy dizayn tili (barcha uch loyiha uchun bir xil)

**Estetika:** Apple × ChatGPT × Airbnb × Linear. Warm minimalism.

**Rang tokenlari** (barcha loyihalarda bir xil — `website/src/app/globals.css` etalon):
- Fon `#FAFAF9` (iliq oq) · Surface `#FFFFFF` · Matn `#111827`
- **Urg'u: orange `#FF6B35`** (yagona) + amber `#FFB703` (gradient sherigi)
- Success `#22C55E` (faqat ochiq/tayyor holat)
- Dark: chuqur ko'mir `#0E0F11`, orange yumshatilgan `#FF7A47`

**Shrift:** Inter. **Radius:** kartalar 20–24px, kontrol 12–14px.
**Qochish:** delivery-app estetikasi, chegirma bannerlari, qizil ustunligi, siqiq layout.

**i18n:** en (default) · uz · ru — uchala loyihada.
**Theme:** light/dark, token-level, tizim + toggle.

> Yangi loyiha qurganda: `website/`dagi design tokenlar, i18n xabarlari va UI
> primitivlarini (`button`, `card`, `logo`) qayta ishlating — noldan yozmang.

---

## 4. Mahsulot arxitekturasi (AI · voice · geo)

Yadro oqim (`tg-mini-app` va `pwa` da bir xil):

```
Foydalanuvchi
  │  (1) lokatsiyani yoqadi  →  koordinatalar (lat/lng)
  │  (2) so'raydi: matn YOKI ovoz  ("shashlik yemoqchiman")
  ▼
BACKEND (umumiy API server)
  ├─ VOICE LAYER (abstract, provayder ENV bilan almashadi):
  │    • Primary:  real-time speech-to-speech (Gemini Live / free realtime API)
  │    • Fallback: STT (ovoz→matn) → Gemini (matn) → TTS (matn→ovoz)
  │    Interfeys bir xil — provayder tokeni/limiti o'zgarsa mijoz kodi o'zgarmaydi.
  ├─ AI (Gemini API): niyatni tushunadi (taom, budjet, kayfiyat, kompaniya, vaqt)
  ├─ GEO-QIDIRUV: koordinata + niyat → yaqin, ochiq, mos restoranlar (masofa bo'yicha)
  └─ RESTORAN DATA: real-time holat (ochiq/tayyor/kutish), menyu, narx, bron
  ▼
Mijoz: yaqin joylar ro'yxati (masofa/narx/holat)
       → bron  |  ZAKAZ (menyu→savat→to'lov)  |  navigatsiya  |  taxi
       + AI javobini ovozda o'qiydi (TTS/realtime)
```

**Delivery (zakaz + dastavka) modeli:**
- **Zakaz FoodGPT'da:** AI chatdan menyu → savat → to'lov. Bu bizning yadromiz —
  foydalanuvchi tajribasi va data shu yerda.
- **Dastavka hamkor orqali:** yetkazishni FoodGPT o'zi qilmaydi — **restoranning o'z
  kuryeri** yoki **hamkor kuryer API** (masalan Yandex/Uzum kuryer, kelajakda) bajaradi.
  Yengil operatsiya, og'ir logistikasiz.
- Bu strategik: biz «yana bir delivery ilova» emasmiz. Zakaz/discovery bizniki,
  yetkazish — hamkor infratuzilma. Yadro moat baribir **data + bron**da qoladi.

**Qat'iy qoidalar:**
- **API kalitlari (Gemini, voice, xarita) — FAQAT backend'da.** Hech qachon mijoz
  bundle'iga (TG/PWA/website) kirmasin. Mijoz backend endpoint'iga so'rov yuboradi.
- **Voice — abstract qatlam.** Backend `/voice` (yoki realtime WS) interfeysi bitta;
  ichida provayder (Gemini realtime / STT+TTS / free token) almashtiriladigan.
  `.env`: `VOICE_PROVIDER=realtime|pipeline`, `GEMINI_API_KEY`, `STT_*`, `TTS_*`.
- **Geo:** lokatsiya mijozda olinadi (TG `location`, PWA `navigator.geolocation`),
  backend'ga koordinata yuboriladi; backend masofa + holat bo'yicha saralaydi.
- **Til:** AI javoblari uz/ru/en — foydalanuvchi tiliga mos. O'zbek tili birinchi.
- **Free token cheklovi:** limit/xatolikda voice fallback'ga o'tadi, matn baribir ishlaydi
  (voice — qulaylik, majburiy emas). Grasefully degrade.

Batafsil (haqiqiy kod): `food_gpttgminiapppwa/backend/CLAUDE.md` va
`food_gpttgminiapppwa/frontend/CLAUDE.md`.

---

## 5. Umumiy konvensiyalar
- TypeScript strict. Kod/kommentlar inglizcha; UI matnlari i18n orqali uz/ru/en.
- Har loyiha o'z papkasida mustaqil ishlaydi (`cd website && npm run dev`).
- Sehrli hex yo'q — CSS var / Tailwind token.
- Har interaktiv element: `focus-visible`, `aria`, `prefers-reduced-motion` hurmat.
- **Muhim (SSR ishonchliligi):** kirish animatsiyalari sof CSS (`animate-fade-up`)
  bilan — Framer Motion `initial opacity:0` / `whileInView` kontentni SSR/preview'da
  yashiradi, ishlatilmasin. Batafsil `website/CLAUDE.md`.

---

## 6. Roadmap (umumiy)
1. **website** ✅ — birinchi taassurot, investor/hamkor uchun (jamoa, yutuqlar, YC sahifa)
2. **ilova** ✅ — TG Mini App = PWA + FastAPI backend (chat, geo, ovoz, bron/zakaz, auth)
3. **keyin:** realtime ovoz (Gemini Live), AI niyat filtri, to'lov, ovqatlanish joylari
   B2B dashboard, real POS integratsiya (iiko/Jowi/Poster)

Har bosqichda: uz/ru/en, light/dark, responsive, build toza.

**Jonli havolalar:** TG bot `t.me/FoodGPT_uzbot` · PWA
`foodgpttgminiapppwa-production.up.railway.app` · YC sahifa: website `/uzcombinator`.
