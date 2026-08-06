# Levent Koleji Web Sitesi

Next.js + Prisma + NextAuth ile okul web sitesi ve yönetim paneli.

## Kurulum

```bash
npm install
cp .env.example .env
# .env içinde Neon DATABASE_URL ve DIRECT_URL değerlerini doldurun
npm run db:migrate
npm run db:seed
npm run dev
```

Site: http://localhost:3000  
Yönetim: http://localhost:3000/admin  

## Vercel + Neon

1. Vercel projesine **Neon** storage ekleyin (veya Neon dashboard'dan connection string alın)
2. Vercel **Environment Variables**:
   - `DATABASE_URL` — pooled connection (`-pooler` host)
   - `DIRECT_URL` — direct connection (migrations için)
   - `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`
3. Deploy sonrası ilk kez seed: `npm run db:seed` (Neon URL ile local'den)

## Varsayılan admin

- E-posta: `admin@leventkoleji.com`
- Şifre: `admin123`

Canlıya almadan önce `.env` / Vercel env içindeki `NEXTAUTH_SECRET` ve admin şifresini değiştirin.

## Marka renkleri (logo)

- Lacivert: `#003048`
- Kırmızı: `#C0000C`
- Altın: `#C09018`
