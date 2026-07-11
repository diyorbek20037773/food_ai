# Backend — Implementatsiya rejasi

> Holat: 📋 rejalashtirilgan. Qoidalar: `./CLAUDE.md`. Arxitektura: `../CLAUDE.md` §4.

## Context
`tg-mini-app` va `pwa` uchun umumiy API. Gemini (matn + voice) + geo-qidiruv.
API kalitlar mijozdan yashiriladi. Mock data bilan boshlanadi, keyin real DB/POS.

## Bosqichlar

### Bosqich 1 — Skeleton + config
- `backend/` da Node + TS + Fastify + zod.
- `config/env.ts`: `.env` zod validatsiya. `.env.example` (kalitsiz).
- `config/models.ts`: Gemini model ID'lari bitta joyda (**yozishdan oldin context7'dan
  joriy `@google/genai` SDK va model ID'larini tekshir** — Gemini tez o'zgaradi).
- `/health` endpoint. CORS (`ALLOWED_ORIGINS`), rate limit.
- **Tekshiruv:** `npm run dev` → `/health` 200.

### Bosqich 2 — Geo + restoran data (mock)
- `services/restaurants.ts`: website `mock.ts` datasini ko'chir (kengaytir: koordinata,
  ish vaqti, real-time holat maydonlari).
- `services/geo.ts`: haversine masofa; koordinata + filtrlar → yaqin/ochiq/mos saralash.
- `POST /api/nearby`: `{ location, filters }` → saralangan restoranlar.
- **Tekshiruv:** koordinata beriladi → masofa bo'yicha to'g'ri tartiblangan ro'yxat.

### Bosqich 3 — Gemini matn (chat/intent)
- `services/gemini.ts`: system prompt (o'zbek lokal kontekst) + niyatni tushunish
  (taom, budjet, kayfiyat, kompaniya, vaqt) → structured filtrlar.
- `POST /api/chat`: `{ text, lang, location }` → Gemini niyat → geo → `{ reply,
  restaurants[] }`. Til uz/ru/en.
- **Tekshiruv:** "200 ming budjetga oilaviy joy" → to'g'ri filtr + mos ro'yxat + o'zbekcha javob.

### Bosqich 4 — Voice: pipeline (fallback avval, barqaror)
- `services/voice/pipeline.ts`: STT (Gemini/free) → `gemini.ts` → TTS
  (`gemini-*-tts-preview`, streaming).
- `services/voice/index.ts`: `VOICE_PROVIDER` bo'yicha engine tanlash.
- `POST /api/voice`: audio → `{ transcript, reply, audioUrl }`.
- **Tekshiruv:** audio fayl → transkript + o'zbekcha ovozli javob.

### Bosqich 5 — Voice: realtime (primary)
- `services/voice/realtime.ts`: Gemini Live (`ai.live.connect`), `responseModalities:
  [AUDIO]`, input/output transcription, `speechConfig` ovoz.
- `WS /api/voice/live`: mijoz audio stream ↔ Gemini Live proxy (16kHz PCM mono).
- Free token limitida avtomatik pipeline'ga degrade.
- **Tekshiruv:** WS orqali real-time gaplashuv; token tugasa pipeline'ga o'tadi.

### Bosqich 6 — Bron + auth (keyin)
- `POST /api/reserve` (boshida mock, keyin real).
- TG initData HMAC validatsiya (bot token). PWA uchun auth (telefon/Telegram login).

## Reuse
- website `src/lib/mock.ts` → restoran data seed.
- Restoran obyekt shakli barcha loyihalarda bir xil.

## Verification (umumiy)
`/health` 200 · `/api/nearby` geo saralash · `/api/chat` o'zbekcha niyat+ro'yxat ·
voice pipeline + realtime · kalitlar `.env`da · CORS/rate-limit · `npm run build` toza.
