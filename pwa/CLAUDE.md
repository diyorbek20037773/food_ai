# FoodGPT — PWA (Progressive Web App) (CLAUDE.md)

> Bu papka FoodGPT'ning **o'rnatiladigan veb-ilovasi**. Brauzerda ochiladi, "Home
> screen"ga o'rnatiladi, offline ishlaydi, push oladi. Telegram'i yo'q foydalanuvchilar
> va iOS/Android home-screen uchun kanal.
>
> Root `../CLAUDE.md` strategiya va dizayn tilini belgilaydi. **Holat: 📋
> rejalashtirilgan** — kod hali yozilmagan. `PLAN.md` ni bajarish rejasi sifatida o'qing.

---

## 1. Nima quramiz — va website'dan farqi

| | `website/` | `pwa/` (bu) |
|-|-----------|-------------|
| Maqsad | Marketing, tanishtiruv | **Ishlaydigan iste'molchi ilova** |
| Kontent | G'oya, jamoa, aloqa | AI-chat, tavsiya, bron, profil, tarix |
| O'rnatish | Yo'q | Home-screen'ga o'rnatiladi |
| Offline | Yo'q | Ha (service worker, cache) |
| Push | Yo'q | Ha (yangi joy, bron eslatma) |

PWA = website `/demo` oqimining to'liq, app-vari, o'rnatiladigan versiyasi.
TG Mini App bilan bir xil mahsulot, lekin Telegram'dan tashqarida — mustaqil web-app.

## 2. Texnologiya steki

| Qatlam | Tanlov | Sabab |
|--------|--------|-------|
| Framework | **Next.js 15 (App Router) + TS** | website bilan bir xil, komponent reuse |
| Styling | **Tailwind + CSS tokenlar** | website design tizimini to'g'ridan-to'g'ri |
| i18n | **next-intl** (uz/ru/en) | website bilan bir xil |
| Theme | **next-themes** (light/dark) | website bilan bir xil |
| Service Worker | **Serwist** (`@serwist/next`) | zamonaviy, Next 15 bilan mos, next-pwa o'rnini bosgan |
| Manifest | `app/manifest.ts` (Next native) | o'rnatish metadata |
| Data | website bilan umumiy API (keyin) | mock bilan boshlanadi |

> **PWA yadrosi:** `manifest` (o'rnatish) + `service worker` (offline/cache) +
> `installable` kriteriyalari (HTTPS, manifest, SW, ikonlar).

## 3. PWA-specific qoidalar (MUHIM)
- **Manifest:** `name`, `short_name` (FoodGPT), `theme_color: #FF6B35`,
  `background_color: #FAFAF9`, `display: standalone`, `start_url`, ikonlar
  (192/512 + maskable).
- **Service worker (Serwist):** app shell precache; API/rasm uchun runtime cache
  (network-first data, cache-first statik). Offline fallback sahifa.
- **Installable:** `beforeinstallprompt` — o'z "Ilovani o'rnatish" tugmasi (chiroyli,
  brauzer bannerига tayanmaslik). iOS uchun "Home screen'ga qo'shish" yo'riqnomasi.
- **Push (keyin):** Web Push (VAPID) — yangi restoran, bron eslatmasi. Faqat ruxsat
  so'ralganda, spam yo'q.
- **App-vari UX:** pastki tab-bar (Chat / Tavsiya / Profil), `standalone` rejimda
  safe-area, splash. Delivery-app estetikasidan qochish saqlanadi.
- **Offline holat:** ulanish yo'qligini aniq ko'rsatish, cache'langan kontentni berish.

## 4. Dizayn
Website design tizimini **to'g'ridan-to'g'ri** ishlatadi (bir xil Next stek):
`globals.css` tokenlar, `Button`/`Card`/`Logo`, i18n `messages`. website'dan farqi —
tuzilish (app-shell, tab-bar) va PWA qatlami, dizayn tili emas.

## 5. Fayl tuzilishi (reja)
```
src/
  app/
    [locale]/
      layout.tsx         # theme + i18n + PWA meta
      page.tsx           # ChatPage (asosiy)
      results/page.tsx   # tavsiya kartalari
      profile/page.tsx   # profil / tarix / sozlamalar
    manifest.ts          # PWA manifest
    ~offline/page.tsx     # offline fallback
  sw.ts                  # Serwist service worker
  components/
    TabBar.tsx  InstallPrompt.tsx  ChatView.tsx  RestaurantCard.tsx
  lib/mock.ts
messages/{uz,ru,en}.json
public/icons/            # 192, 512, maskable, apple-touch
next.config.mjs          # withSerwist + next-intl
```

## 6. Buyruqlar (reja)
```
npm install
npm run dev            # localhost:3000 (SW dev'da cheklangan)
npm run build && npm start   # PWA to'liq (SW faol) — install/offline test
```
Test: Chrome DevTools → Application → Manifest/Service Workers; Lighthouse PWA audit.

## 7. Tugallanish mezoni
- [ ] Lighthouse PWA: installable ✓, offline ishlaydi ✓
- [ ] Home-screen'ga o'rnatiladi (Android/desktop), iOS yo'riqnoma
- [ ] uz/ru/en + light/dark
- [ ] Offline'da app-shell + cache'langan kontent ochiladi
- [ ] `npm run build` toza; tab-bar navigatsiya, install tugma ishlaydi
