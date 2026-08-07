import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const city = "R" + "ize";
const contactAddress = `${city} Levent Koleji Fabrika Sokak Hayrat, 53020 ${city} Merkez/${city}`;

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@leventkoleji.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash, name: "Yönetici" },
    create: { email, name: "Yönetici", passwordHash },
  });

  await prisma.siteSetting.upsert({
    where: { id: "main" },
    update: {
      phone: "(0464) 217 15 55",
      email: "info@leventokullari.com",
      address: contactAddress,
    },
    create: {
      id: "main",
      siteName: "Levent Koleji",
      tagline: "Eğitimde mükemmellik",
      phone: "(0464) 217 15 55",
      email: "info@leventokullari.com",
      address: contactAddress,
      heroTitle: "Levent Koleji",
      heroSubtitle:
        "Öğrencilerimizi en yüksek başarıya ulaştırmak için uzman kadromuzla yanınızdayız.",
      aboutPreview:
        "Bölgenin köklü eğitim kurumlarından biri olarak akademik başarıyı ve karakter gelişimini birlikte büyütüyoruz.",
    },
  });

  const hakkimizdaContent =
    "Levent College Concept, 2018'den bu güne öğrencilerin potansiyellerini keşfetmelerine, bilgiye açılan kapılar aralamalarına ve başarıya ulaşmalarına olanak tanıyan bir eğitim kurumudur. Modern eğitim anlayışıyla donatılmış okulumuz, öğrencilere yenilikçi yöntemlerle eğitim verirken, onların bireysel gelişimlerini destekleyerek geleceğe hazırlar. Nitelikli öğretmen kadrosuyla öğrencilere ilham veren bir ortam sunar. Levent College Concept, her bir öğrencinin yeteneklerini açığa çıkarmasını, yaratıcılıklarını geliştirmesini ve en yüksek potansiyellerine ulaşmasını sağlar.\n\nLevent College Concept, öğrencilere akademik başarılarının yanı sıra bir dizi destekleyici hizmet sunar. Öğrencilerin kişisel ve akademik gelişimlerini desteklemek için çeşitli etkinlikler, kulüpler ve atölye çalışmaları düzenlenir. Öğrencilere rehberlik hizmetleri sunularak kariyer planlamaları ve üniversiteye hazırlık süreçleri desteklenir. Ayrıca, modern eğitim teknolojileriyle donatılmış sınıflar ve laboratuvarlar, öğrencilerin interaktif bir öğrenme deneyimi yaşamasını sağlar. Levent College Concept, öğrencilerin sadece akademik olarak değil, aynı zamanda sosyal ve duygusal açıdan da gelişmelerini destekleyerek bireylerin geleceğe güvenle bakmalarını sağlar.";

  await prisma.page.upsert({
    where: { slug: "hakkimizda" },
    update: { content: hakkimizdaContent },
    create: {
      slug: "hakkimizda",
      title: "Hakkımızda",
      content: hakkimizdaContent,
    },
  });

  const events = [
    {
      title: "Palandöken Gezisi",
      slug: "palandoken-gezisi",
      excerpt: "Öğrencilerimizle doğa ve spor dolu bir Palandöken deneyimi.",
      content:
        "Palandöken gezimizde öğrencilerimiz hem sosyal bağlarını güçlendirdi hem de doğa içinde aktif bir gün geçirdi.\n\nKatılım ve sonraki dönem planları için okul yönetimimizle iletişime geçebilirsiniz.",
      location: "Erzurum / Palandöken",
      eventDate: new Date("2026-02-15"),
    },
    {
      title: "Tiflis Kültür Gezisi",
      slug: "tiflis-kultur-gezisi",
      excerpt: "Tarih, kültür ve dil deneyimini bir araya getiren yurt dışı programı.",
      content:
        "Tiflis kültür gezisi kapsamında öğrencilerimiz tarihi mekanları ziyaret etti, kültürel etkinliklere katıldı ve dil pratiği fırsatı buldu.",
      location: "Tiflis",
      eventDate: new Date("2025-11-10"),
    },
    {
      title: "Yaz Okulu Programı",
      slug: "yaz-okulu-programi",
      excerpt: "Yaz döneminde akademik destek ve sosyal etkinlikler bir arada.",
      content:
        "Yaz okulu programımızda branş dersleri, rehberlik çalışmaları ve sosyal etkinlikler dengeli bir şekilde planlanmıştır.",
      location: "Levent Koleji Kampüsü",
      eventDate: new Date("2026-07-01"),
    },
  ];

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    });
  }

  const programs = [
    {
      title: "Ortaokul",
      slug: "ortaokul",
      summary: "Temel akademik becerileri güçlendiren, disiplinli ve destekleyici ortaokul programı.",
      description:
        "Ortaokul kademesinde öğrencilerimize güçlü bir akademik temel, düzenli ölçme-değerlendirme ve rehberlik desteği sunuyoruz.",
      order: 1,
    },
    {
      title: "Lise",
      slug: "lise",
      summary: "Üniversite hedefli, branş odaklı ve bireysel takip içeren lise programı.",
      description:
        "Lise programımız; TYT-AYT hazırlığı, branş dersleri ve kişisel gelişim odaklı rehberlik ile öğrencilerimizi hedefledikleri bölümlere hazırlar.",
      order: 2,
    },
    {
      title: "Yabancı Dil",
      slug: "yabanci-dil",
      summary: "Çoklu dil becerilerini geliştiren uygulamalı dil programları.",
      description:
        "İletişim odaklı dil eğitimi ile öğrencilerimizin akademik ve günlük hayatta etkili iletişim kurmalarını hedefliyoruz.",
      order: 3,
    },
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: program,
    });
  }

  console.log("Seed tamamlandı.");
  console.log(`Admin: ${email} / ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
