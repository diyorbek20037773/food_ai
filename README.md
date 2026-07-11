<div align="center">

# 🍽️ FoodGPT

**AI orqali «bugun nima yeyman?» savolini hal qiluvchi O'zbekiston restoran platformasi**

Tabiiy tilda so'rang → AI yaqin, ochiq va sizga mos joyni topadi → bron, navigatsiya, taxi bir oqimda.

</div>

---

## Loyiha haqida

FoodGPT — oddiy restoran qidiruvi emas. Yadro qiymat: **restoranlarning real-time
ma'lumot va bron infratuzilmasi**. AI — foydalanuvchi bilan bog'lovchi interfeys.

**Muammo:** O'zbekistonda odam och qolganda qayerda, nima, aynan hozir tayyorligini
tez topa olmaydi — barcha restoranlarni birlashtirgan platforma yo'q.

**Yechim:** «Shashlik yemoqchiman» yoki «200 ming budjetga oilaviy joy» deb yozing —
AI 30 soniyada mos joyni topadi, bron qiladi, yo'l ko'rsatadi.

## Repo tuzilishi

| Papka | Nima | Holat |
|-------|------|-------|
| [`website/`](./website) | Marketing sayt (Next.js 15) | ✅ Tayyor |
| [`backend/`](./backend) | Umumiy API: Gemini AI, ovoz (STT/TTS + realtime), geo-qidiruv | 📋 Rejalashtirilgan |
| [`tg-mini-app/`](./tg-mini-app) | Telegram Mini App | 📋 Rejalashtirilgan |
| [`pwa/`](./pwa) | Progressive Web App | 📋 Rejalashtirilgan |

**Texnik yadro:** `tg-mini-app` va `pwa` bir xil `backend`'ni ishlatadi — lokatsiya →
yaqin ovqatlanish joylari, tabiiy tilda (matn/ovoz) qidiruv. AI: **Gemini API**.
Ovoz: real-time gaplashuv (primary) + STT/TTS pipeline (fallback). API kalitlar faqat
backend'da.

## Website — ishga tushirish

```bash
cd website
npm install
npm run dev      # http://localhost:3000
```

**Stek:** Next.js 15 · TypeScript · Tailwind CSS · next-intl (uz/ru/en) · next-themes.
**Dizayn:** Apple × ChatGPT × Airbnb × Linear — warm minimalism, oq fon + orange urg'u.

## Yo'l xaritasi

- [x] Marketing website (info-only)
- [ ] Backend API (Gemini AI, ovoz, geo-qidiruv)
- [ ] Telegram Mini App (lokatsiya, ovoz, bron)
- [ ] PWA (offline, push, home-screen)
- [ ] Restoran B2B dashboard + real POS integratsiya

---

<div align="center">
<sub>Toshkentda mehr bilan yaratilgan · 2026</sub>
</div>
