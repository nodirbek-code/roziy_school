# Roziy Xalqaro Xususiy Maktabi — Frontend (React SPA)

Backend'dagi DRF API'ga ulanadigan React SPA. Vite orqali qurilgan, sahifa
almashinuvi client-side (`react-router-dom`), server holatini
`@tanstack/react-query` boshqarishi mumkin (hozircha oddiy `useEffect` bilan
ham ishlatilgan, kerak bo'lsa keyin `useQuery`ga o'tkazish oson).

## Texnologiyalar

- **React 19 + Vite** — build tool va dev server
- **react-router-dom** — sahifalar orasida navigatsiya
- **axios** — API so'rovlari, JWT token bilan avtomatik autentifikatsiya
- **@tanstack/react-query** — o'rnatilgan, kerak bo'lganda server-state
  keshlash uchun tayyor (masalan taomnoma kabi o'zgarmas ma'lumotlar uchun)
- Custom CSS (Tailwind emas) — maktabga xos, o'ziga xos dizayn uchun
  (`Fraunces` sarlavha shrifti + `Inter` matn shrifti, ko'k/oltin rang sxemasi)

## O'rnatish

```bash
npm install
cp .env.example .env       # VITE_API_BASE_URL ni backend manziliga moslang
npm run dev                # http://localhost:5173
```

Production build:

```bash
npm run build               # dist/ papkasida tayyor bo'ladi
npm run preview             # buildni lokal tekshirish uchun
```

## Loyihaning qismlari

### 1. `src/api/` — backend bilan bog'lanish qatlami
- `client.js` — bitta umumiy `axios` instansi. Har bir so'rovga JWT
  `access_token`ni avtomatik qo'shadi (agar bo'lsa). 401 xatolik kelsa,
  `refresh_token` orqali tokenni avtomatik yangilashga urinadi.
- `endpoints.js` — backend'dagi har bir endpoint uchun alohida funksiya
  (`getSiteSettings`, `getWeeklyMenu`, `submitApplication` va h.k.). Sahifalar
  hech qachon to'g'ridan-to'g'ri URL yozmaydi, faqat shu funksiyalarni
  chaqiradi — backend URL o'zgarsa, faqat shu faylni tahrirlash kifoya.

### 2. `src/index.css` — dizayn tokenlari
Butun sayt uchun rang, shrift, bo'shliq o'zgaruvchilari (`--color-navy`,
`--color-gold`, `--font-display` va h.k.) shu yerda belgilangan. Har bir
sahifa/komponentning o'z CSS fayli shu tokenlardan foydalanadi, shuning
uchun rang sxemasini o'zgartirish uchun faqat shu bitta faylni tahrirlash
kifoya.

### 3. `src/components/` — umumiy qismlar
- `Header.jsx` — yuqori navigatsiya, mobil menyu (`hamburger`) bilan
- `Footer.jsx` — aloqa ma'lumotlari, litsenziya raqami — bularning barchasi
  `/api/core/settings/`dan **jonli** olinadi (kodga "hardcode" qilinmagan)
- `Layout.jsx` — Header + Footer + sahifa kontentini birlashtiruvchi qobiq

### 4. `src/pages/` — har bir sahifa alohida modul
| Fayl | Yo'l | Nima ko'rsatadi |
|---|---|---|
| `Home.jsx` | `/` | Hero, ishonch ma'lumotlari (litsenziya/tuition/manzil), ota-ona sharhlari |
| `About.jsx` | `/haqida` | Maktab tavsifi, litsenziya rasmi, o'qituvchilar ro'yxati |
| `Academics.jsx` | `/talim` | Sinflar va fanlar ro'yxati (ochiladigan bo'limlar) |
| `Admissions.jsx` | `/qabul` | Ariza formasi (bola/ota-ona ma'lumotlari) |
| `Meals.jsx` | `/taomnoma` | 5 kunlik menyu, kun tanlash tab'lari orqali |
| `Gallery.jsx` | `/galereya` | Kategoriya bo'yicha filtrlanadigan rasm galereyasi |
| `News.jsx` / `NewsDetail.jsx` | `/yangiliklar` | Yangiliklar ro'yxati va bitta post sahifasi |
| `Contact.jsx` | `/aloqa` | Murojaat formasi |

Har bir sahifa o'zining `.css` faylini import qiladi (masalan
`meals.css`), shunda global stil bilan sahifaga xos stil bir-biriga
aralashmaydi.

### 5. `src/App.jsx` — routing
Barcha sahifalarni `react-router-dom` orqali bog'laydi, `Layout` ichida
render qiladi. `QueryClientProvider` allaqachon o'rnatilgan — kelajakda
har bir `useEffect + useState` juftligini `useQuery`ga almashtirish orqali
avtomatik keshlash, qayta yuklash va loading holatlarini boshqarish oson
bo'ladi.

## Rang va shrift tanlovi haqida

Brend materiallaridagi (Instagram post, litsenziya, taomnoma posteri) to'q
ko'k va oltin ranglarga asoslangan: `--color-navy-deep` (#0a1f3d) asosiy fon,
`--color-gold` (#d9a441) aksent tugma/CTA uchun, `--color-teal` (#1f6f5c)
ishonch belgilaydigan matnlar (masalan narx, litsenziya) uchun ishlatilgan.
Sarlavhalar uchun `Fraunces` (yumshoq, insho hissi beruvchi serif) va matn
uchun `Inter` tanlangan — bu tanlov "SaaS-uslub" shablon dizayndan farqli,
ta'lim/ishonch mavzusiga mos bo'lishi uchun qilingan.

## Keyingi qadamlar (tavsiya)

1. Ota-ona/o'quvchi portali (login, baholar, davomat) — `accounts` API
   allaqachon tayyor, faqat frontendda login sahifasi va himoyalangan
   marshrutlar (`ProtectedRoute`) qo'shish kerak.
2. Video testimonial'larni saytga to'g'ridan-to'g'ri Instagram/YouTube
   embed sifatida ko'rsatish (hozircha tashqi havola sifatida ochiladi).
3. SEO uchun `react-helmet-async` yoki Next.js'ga o'tish (agar server-side
   rendering kerak bo'lsa).
4. Production build'ni Nginx yoki Vercel/Netlify orqali joylashtirish,
   `.env`da `VITE_API_BASE_URL`ni haqiqiy domen bilan almashtirish.
