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

## 2. Repo tuzilishi (monorepo)

Bitta repo, to'rtta mustaqil loyiha (uch mijoz + bitta backend):

```
food_ai/
├── CLAUDE.md          # SHU FAYL — root yo'riqnoma
├── README.md          # loyiha tavsifi
├── .gitignore         # umumiy ignore (barcha subprojectlar uchun)
├── website/           # ✅ QURILGAN — marketing sayt (Next.js)
│   └── CLAUDE.md       #    website qoidalari
├── backend/           # 📋 REJALASHTIRILGAN — umumiy API server (Node+Fastify)
│   ├── CLAUDE.md       #    backend qoidalari (Gemini, voice, geo)
│   └── PLAN.md         #    implementatsiya rejasi
├── tg-mini-app/       # 📋 REJALASHTIRILGAN — Telegram Mini App
│   ├── CLAUDE.md       #    tg-mini-app qoidalari
│   └── PLAN.md         #    implementatsiya rejasi
└── pwa/               # 📋 REJALASHTIRILGAN — Progressive Web App
    ├── CLAUDE.md       #    pwa qoidalari
    └── PLAN.md         #    implementatsiya rejasi
```

**Holat:**
| Loyiha | Nima | Holat |
|--------|------|-------|
| `website/` | Marketing sayt: g'oya, muammo/yechim, imkoniyatlar, demo, aloqa | ✅ Tayyor |
| `backend/` | Umumiy API: Gemini AI, voice (STT/TTS+realtime), geo-qidiruv, restoran DB | 📋 Plan bor, kod yo'q |
| `tg-mini-app/` | Telegram ichida ishlaydigan asosiy iste'molchi ilova | 📋 Plan bor, kod yo'q |
| `pwa/` | O'rnatiladigan veb-ilova (offline, push, home-screen) | 📋 Plan bor, kod yo'q |

Har biri o'z `package.json`, `node_modules`, dev serveri bilan **mustaqil**.
Root'da monorepo asbobi (turbo/nx) YO'Q — oddiy papkalar, kerak bo'lsa keyin qo'shiladi.

**Mijoz → backend:** `tg-mini-app` va `pwa` bir xil `backend` API'ni ishlatadi
(bitta AI/voice/geo mantiqi, ikki mijoz). `website` — statik marketing, backend'siz.

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

**i18n:** uz (default) · ru · en — uchala loyihada.
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

Backend tafsilotlari: `backend/CLAUDE.md`. Mijoz ulanishi: har mijozning CLAUDE.md.

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
1. **website** ✅ — birinchi taassurot, investor/hamkor uchun
2. **backend** — Gemini AI, voice layer, geo-qidiruv (mijozlar shunga ulanadi)
3. **tg-mini-app** — asosiy iste'molchi kanali (O'zbekistonda TG dominant)
4. **pwa** — brauzer/home-screen ilova, offline
5. **keyin:** restoran B2B dashboard, real POS integratsiya (iiko/Jowi/Poster)

Har bo'sqichda: uz/ru/en, light/dark, responsive, `npm run build` toza.
