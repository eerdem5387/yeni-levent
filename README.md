# Levent Koleji Web Sitesi

Next.js + Prisma + NextAuth ile okul web sitesi ve yönetim paneli.

## Kurulum

```bash
npm install
npx prisma migrate dev
npm run db:seed
npm run dev
```

Site: http://localhost:3000  
Yönetim: http://localhost:3000/admin  

## Varsayılan admin

- E-posta: `admin@leventkoleji.com`
- Şifre: `admin123`

Canlıya almadan önce `.env` içindeki `NEXTAUTH_SECRET` ve admin şifresini değiştirin.

## Marka renkleri (logo)

- Lacivert: `#003048`
- Kırmızı: `#C0000C`
- Altın: `#C09018`
