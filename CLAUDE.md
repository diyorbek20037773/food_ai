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

Bitta repo, uchta mustaqil mahsulot:

```
food_ai/
├── CLAUDE.md          # SHU FAYL — root yo'riqnoma
├── README.md          # loyiha tavsifi
├── .gitignore         # umumiy ignore (barcha subprojectlar uchun)
├── website/           # ✅ QURILGAN — marketing sayt (Next.js)
│   └── CLAUDE.md       #    website qoidalari
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
| `tg-mini-app/` | Telegram ichida ishlaydigan asosiy iste'molchi ilova | 📋 Plan bor, kod yo'q |
| `pwa/` | O'rnatiladigan veb-ilova (offline, push, home-screen) | 📋 Plan bor, kod yo'q |

Har biri o'z `package.json`, `node_modules`, dev serveri bilan **mustaqil**.
Root'da monorepo asbobi (turbo/nx) YO'Q — oddiy papkalar, kerak bo'lsa keyin qo'shiladi.

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

## 4. Umumiy konvensiyalar
- TypeScript strict. Kod/kommentlar inglizcha; UI matnlari i18n orqali uz/ru/en.
- Har loyiha o'z papkasida mustaqil ishlaydi (`cd website && npm run dev`).
- Sehrli hex yo'q — CSS var / Tailwind token.
- Har interaktiv element: `focus-visible`, `aria`, `prefers-reduced-motion` hurmat.
- **Muhim (SSR ishonchliligi):** kirish animatsiyalari sof CSS (`animate-fade-up`)
  bilan — Framer Motion `initial opacity:0` / `whileInView` kontentni SSR/preview'da
  yashiradi, ishlatilmasin. Batafsil `website/CLAUDE.md`.

---

## 5. Roadmap (umumiy)
1. **website** ✅ — birinchi taassurot, investor/hamkor uchun
2. **tg-mini-app** — asosiy iste'molchi kanali (O'zbekistonda TG dominant)
3. **pwa** — brauzer/home-screen ilova, offline
4. **keyin:** restoran B2B dashboard, real POS integratsiya (iiko/Jowi/Poster)

Har bo'sqichda: uz/ru/en, light/dark, responsive, `npm run build` toza.
