# Roziy Xalqaro Xususiy Maktabi — Backend (DRF API)

"Roziy Xalqaro Xususiy Maktabi" (Shovot tumani, Xorazm viloyati) uchun sayt backendi.
Django + Django REST Framework asosida qurilgan, **API-only** backend — frontend
alohida SPA (React) sifatida quriladi va bu API'ga so'rov yuboradi.

## Texnologiyalar

- **Django 6** + **Django REST Framework** — asosiy backend
- **SimpleJWT** — token asosidagi autentifikatsiya (parent/admin portal uchun)
- **django-cors-headers** — SPA frontend bilan bog'lanish uchun CORS
- **django-filter** — ro'yxatlarni filtrlash
- **Pillow** — rasm fayllari bilan ishlash
- SQLite (development) / PostgreSQL (production, `.env` orqali)

FastAPI hozircha ishlatilmagan — agar kelajakda real-time bildirishnoma
(masalan Telegram bot orqali ariza kelganda xabar yuborish) yoki alohida
tezkor mikroservis kerak bo'lsa, shu backend bilan bir DB'ni ulashgan holda
qo'shiladi.

## O'rnatish

```bash
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env               # va .env faylini to'ldiring

python manage.py migrate
python manage.py seed_grades       # 1-9 sinflarni yaratadi
python manage.py seed_meals        # haqiqiy haftalik taomnomani yuklaydi
python manage.py createsuperuser   # admin panel uchun

python manage.py runserver
```

Admin panel: `http://127.0.0.1:8000/admin/`
API root: `http://127.0.0.1:8000/api/`

## App'lar va ularning vazifasi

### `core`
Saytning global sozlamalarini saqlaydi: maktab nomi, tagline, telefon,
Instagram, manzil, oylik to'lov summasi va **litsenziya ma'lumotlari**
(litsenziya raqami, egasi, faoliyat turi, litsenziya rasmi — old va orqa
tomon). Bitta yagona yozuv (singleton) sifatida ishlaydi. Shuningdek, oddiy
statik sahifalar (masalan "Haqida", "Missiya") uchun `Page` modeli bor.

- `GET /api/core/settings/` — barcha global sozlamalar
- `GET /api/core/pages/` , `GET /api/core/pages/{slug}/`

### `accounts`
Maxsus `User` modeli, rol maydoni bilan (`admin` / `staff` / `parent`).
Kelajakda ota-ona/o'quvchi portali (baholar, davomat) shu orqali quriladi.
Login JWT orqali (`/api/auth/login/`, `/api/auth/refresh/`).

- `POST /api/accounts/register/` — ota-ona ro'yxatdan o'tishi
- `GET/PATCH /api/accounts/me/` — o'z profili

### `academics`
Sinflar (`Grade`, 1-9-sinf) va fanlar (`Subject`). Har bir fan bir nechta
sinfga bog'lanishi mumkin (`ManyToMany`).

- `GET /api/academics/grades/`
- `GET /api/academics/subjects/`

### `admissions`
Ariza (`Application`) — bola ismi, tug'ilgan sanasi, qaysi sinfga, ota-ona
ismi va telefoni. Status: yangi → ko'rib chiqilmoqda → qabul qilindi/rad
etildi. Admin panelda status o'zgartiriladi.

- `POST /api/admissions/apply/` — ochiq forma (frontenddagi "Hoziroq
  murojaat qiling" tugmasi shu yerga so'rov yuboradi)

### `meals`
Haftalik taomnoma — **doimiy/statik** (har hafta bir xil takrorlanadi).
`MealDay` (1-5-kun) → `MealItem` (tushlik/choy vaqti taomlari, rasm bilan),
va `MealAddon` (har kunga qo'shiladigan non, kompot, meva, yogurt kabi
qo'shimchalar). `seed_meals` buyrug'i orqali haqiqiy menyu bir marta
yuklanadi; keyin faqat admin panel orqali tahrirlanadi.

- `GET /api/meals/` — 5 kunlik to'liq menyu + addon'lar, bitta so'rovda
  (frontend bu javobni doimiy keshlab qo'yishi mumkin, chunki o'zgarmaydi)

### `gallery`
Rasm galereyasi, kategoriyalarga bo'lingan: **o'qituvchilar, xonalar,
tashqi ko'rinish, umumiy**. Har bir kategoriya o'z rasmlarini o'zida
saqlaydi.

- `GET /api/gallery/` — barcha kategoriyalar + ichidagi rasmlar

### `staff`
O'qituvchilar profili (ism, fan, rasm, qisqa bio) — galereyadan farqli
o'laroq, bu yerda har bir o'qituvchi alohida ma'lumot birligi sifatida
saqlanadi ("O'qituvchilar" sahifasi uchun).

- `GET /api/staff/`

### `testimonials`
Ota-ona va bitiruvchi sharhlari — **matn** yoki **video** (Instagram/
YouTube link orqali, yoki serverga yuklangan fayl). Maktab asoschisi bilan
qilingan intervyu videolari ham shu yerda saqlanadi.

- `GET /api/testimonials/`

### `news`
Yangiliklar/blog — maktab hayoti, tadbirlar, e'lonlar.

- `GET /api/news/` (sahifalangan), `GET /api/news/{slug}/`

### `contacts`
"Aloqa" formasi orqali kelgan murojaatlar (ism, telefon, xabar).

- `POST /api/contacts/send/`

## Loyihaning umumiy API xaritasi

```
/api/auth/login/              POST  - JWT token olish
/api/auth/refresh/            POST  - tokenni yangilash
/api/accounts/register/       POST
/api/accounts/me/             GET/PATCH

/api/core/settings/           GET
/api/core/pages/              GET
/api/core/pages/{slug}/       GET

/api/academics/grades/        GET
/api/academics/subjects/      GET

/api/admissions/apply/        POST

/api/meals/                   GET

/api/gallery/                 GET
/api/gallery/{slug}/          GET

/api/staff/                   GET

/api/testimonials/            GET

/api/news/                    GET
/api/news/{slug}/             GET

/api/contacts/send/           POST
```

## Keyingi qadamlar (tavsiya)

1. Litsenziya rasmlarini (`core.SiteSettings.license_image_front/back`) va
   maktab tashqi ko'rinishi/xona rasmlarini admin panel orqali yuklash.
2. `seed_meals`dagi taomlar uchun rasm qo'shish (`MealItem.image`).
3. Ariza kelganda maktab jamoasiga Telegram orqali xabar yuborish — bu
   funksiya alohida FastAPI mikroservis yoki Django signal + Telegram
   Bot API orqali qo'shilishi mumkin.
4. Production uchun `.env`da `DB_ENGINE=postgres` qo'yib PostgreSQL'ga
   o'tish, `DJANGO_DEBUG=False`, haqiqiy `DJANGO_SECRET_KEY`.
