import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

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
    update: {},
    create: {
      id: "main",
      siteName: "Levent Koleji",
      tagline: "Eğitimde mükemmellik",
      phone: "(0464) 217 15 55",
      email: "info@leventokullari.com",
      address: "Hayrat, 53020 Rize Merkez / Rize",
      heroTitle: "Levent Koleji",
      heroSubtitle:
        "Öğrencilerimizi en yüksek başarıya ulaştırmak için uzman kadromuzla yanınızdayız.",
      aboutPreview:
        "Bölgenin köklü eğitim kurumlarından biri olarak akademik başarıyı ve karakter gelişimini birlikte büyütüyoruz.",
    },
  });

  await prisma.page.upsert({
    where: { slug: "hakkimizda" },
    update: {},
    create: {
      slug: "hakkimizda",
      title: "Hakkımızda",
      content:
        "Levent Koleji, 2018 yılından bu yana öğrencilerin akademik başarısını ve kişisel gelişimini merkeze alan bir eğitim anlayışıyla hizmet vermektedir.\n\nUzman kadromuz, modern öğretim yöntemleri ve bireysel takip sistemiyle her öğrencinin potansiyelini en üst seviyeye çıkarmayı hedefler.",
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

  const staff = [
    {
      name: "Örnek Rehber Öğretmen",
      title: "Rehberlik",
      bio: "Öğrenci gelişimini akademik ve duygusal boyutlarıyla destekler.",
      order: 1,
    },
    {
      name: "Örnek Matematik Öğretmeni",
      title: "Matematik",
      bio: "Kavramsal öğrenme ve problem çözme becerilerini güçlendirir.",
      order: 2,
    },
    {
      name: "Örnek Fizik Öğretmeni",
      title: "Fizik",
      bio: "Deney ve uygulama temelli fizik eğitimi sunar.",
      order: 3,
    },
  ];

  const existingStaff = await prisma.staff.count();
  if (existingStaff === 0) {
    await prisma.staff.createMany({ data: staff });
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
