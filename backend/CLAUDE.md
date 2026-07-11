# FoodGPT — Backend (CLAUDE.md)

> Bu papka **umumiy API server**. `tg-mini-app` va `pwa` bir xil backend'ni
> ishlatadi — bitta AI/voice/geo mantiqi, ikki (keyin uch) mijoz. `website`
> backend'siz (statik marketing).
>
> Root `../CLAUDE.md` da mahsulot arxitekturasi (voice layer, geo oqim). Bu fayl
> backend-specific. **Holat: 📋 rejalashtirilgan** — kod yo'q. `PLAN.md` = bajarish rejasi.

---

## 1. Vazifasi

Mijoz so'raydi (matn/ovoz + lokatsiya) → backend niyatni tushunadi (Gemini) →
yaqin, ochiq, mos restoranlarni topadi (geo) → javob (matn + ovoz) qaytaradi.

**Nima uchun alohida server:** API kalitlari (Gemini, voice, xarita) mijoz
bundle'iga tushmasligi SHART. Backend ularni yashiradi; mijoz faqat bizning
endpoint'ga so'rov yuboradi. Bu — xavfsizlik va yagona mantiq.

## 2. Texnologiya steki

| Qatlam | Tanlov | Sabab |
|--------|--------|-------|
| Runtime | **Node.js ≥ 20 + TypeScript** | mijozlar bilan bir xil til |
| Framework | **Fastify** | tez, WebSocket qo'llab-quvvatlaydi (voice realtime uchun) |
| AI | **Gemini API** — `@google/genai` SDK | matn, Live (realtime), TTS |
| Realtime voice | **Gemini Live API** (`ai.live.connect`) | speech-to-speech, WS |
| Validatsiya | **zod** | so'rov/javob sxemasi |
| DB (keyin) | **PostgreSQL + Prisma** yoki boshlanishiga JSON/mock | restoran data |
| Geo | oddiy haversine masofa (boshida), keyin PostGIS/tashqi geo | yaqinlik saralash |

> **DIQQAT:** hech qanday frontend YO'Q. Toza API. Deploy: Railway (website bilan
> bir repo, alohida service — root `backend/`).

## 3. Voice layer — abstract (MUHIM)

Voice bitta ichki interfeys ortida; provayder ENV bilan almashadi. Mijoz kodi
provayderni bilmaydi.

```
interface VoiceEngine {
  // realtime: audio in → audio out (WS stream)
  // pipeline: audio in → STT → text → Gemini → TTS → audio out
  transcribe(audio): Promise<string>          // STT (pipeline)
  speak(text, lang): Promise<AudioStream>      // TTS (pipeline)
  realtimeSession(opts): LiveSession           // realtime (primary)
}
```

- **Primary — realtime:** Gemini Live (`gemini-*-live-preview`), `responseModalities:
  [AUDIO]`, `inputAudioTranscription`/`outputAudioTranscription` yoqilgan, `speechConfig`
  bilan ovoz tanlanadi. Mijoz ↔ backend WS orqali audio chunk (16-bit PCM, 16kHz, mono).
- **Fallback — pipeline:** STT (Gemini yoki free provayder) → Gemini text → TTS
  (`gemini-*-tts-preview`, streaming, prebuilt voice). Realtime token/limit tugasa
  yoki `VOICE_PROVIDER=pipeline` bo'lsa shu ishlaydi.
- **Grasefully degrade:** voice ishlamasa — matn baribir ishlaydi. Voice = qulaylik.
- Model nomlari/versiyalari `.env` va bitta config'da (`src/config/models.ts`) —
  hard-code YO'Q, chunki Gemini modellari tez yangilanadi. Yozishdan oldin
  context7 orqali joriy model ID va SDK'ni tekshiring.

## 4. Endpointlar (reja)

```
POST /api/chat          # { text, lang, location } → { reply, restaurants[] }
POST /api/nearby        # { location, filters } → { restaurants[] } (geo saralash)
POST /api/voice         # pipeline: audio → { transcript, reply, audioUrl }
WS   /api/voice/live    # realtime: audio stream ↔ audio stream (Gemini Live proxy)
GET  /api/restaurants/:id
POST /api/reserve       # { restaurantId, time, people } → bron (keyin real)
GET  /health
```

Javob shakli barcha mijozlar uchun bir xil (TG/PWA). Restoran obyekti website
`mock.ts` bilan mos: `{ id, name, dish, km, rating, priceFrom, waitMin, ready }`.

## 5. Kalit qoidalar
- **Sirlar `.env`da**, repoga tushmaydi (`.env.example` bo'ladi). `.gitignore` qamraydi.
- `GEMINI_API_KEY`, `VOICE_PROVIDER`, (kerak bo'lsa) `STT_API_KEY`/`TTS_API_KEY`,
  `PORT`, `DATABASE_URL`, `MAPS_API_KEY`, `ALLOWED_ORIGINS` (CORS: TG/PWA/website).
- **CORS:** faqat bizning mijoz domenlariga. TG Mini App initData validatsiyasi shu
  yerda (bot token HMAC) — `tg-mini-app` auth qo'shilganda.
- **Rate limit** har IP/user (Gemini free token himoyasi).
- **Xato → aniq JSON** (`{ error, code }`), voice xatoda matn-fallback.
- Til: AI javoblari uz/ru/en; system prompt o'zbek lokal kontekstini biladi
  (osh/norin/tandir, budjet so'mda, mahalliy taomlar).

## 6. Fayl tuzilishi (reja)
```
src/
  server.ts              # Fastify init, CORS, routes, WS
  config/
    env.ts               # zod bilan .env validatsiya
    models.ts            # Gemini model ID'lari (bitta joyda)
  routes/
    chat.ts  nearby.ts  voice.ts  voice-live.ts  restaurants.ts  reserve.ts
  services/
    gemini.ts            # text/intent (niyatni tushunish)
    voice/
      index.ts           # VoiceEngine tanlash (ENV)
      realtime.ts        # Gemini Live
      pipeline.ts        # STT → Gemini → TTS
    geo.ts               # haversine masofa, yaqinlik saralash
    restaurants.ts       # data (mock → DB)
  lib/                   # utils, zod sxemalar
.env.example
```

## 7. Buyruqlar (reja)
```
npm install
npm run dev            # tsx watch — localhost:8080
npm run build          # tsc → dist/
npm start              # node dist/server.js
```

## 8. Tugallanish mezoni
- [ ] `/api/chat` matn so'rov → Gemini niyat → yaqin restoranlar (mock geo)
- [ ] `/api/nearby` koordinata → masofa bo'yicha saralangan ro'yxat
- [ ] Voice: pipeline (STT→Gemini→TTS) ishlaydi; realtime WS proxy ulanadi
- [ ] Kalitlar `.env`da, CORS mijozlarga cheklangan, rate limit bor
- [ ] `npm run build` toza; `/health` 200
