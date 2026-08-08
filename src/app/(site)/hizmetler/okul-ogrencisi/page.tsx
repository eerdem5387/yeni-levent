import Link from "next/link";
import { PageHero } from "@/components/site/HomeSections";

export const metadata = { title: "Okul Öğrencisine Açık Hizmetler" };

const items = [
  {
    href: "/etkinlikler/tiflis-kultur-gezisi",
    title: "Tiflis Gezisi",
    text: "Tarih, kültür ve dil deneyimini bir araya getiren yurt dışı programı.",
  },
  {
    href: "/etkinlikler/yaz-okulu-programi",
    title: "Yaz Okulu Programları",
    text: "Yaz döneminde akademik destek ve sosyal etkinlikler bir arada.",
  },
  {
    href: "/etkinlikler/palandoken-gezisi",
    title: "Palandöken Gezisi Başvuru Formu",
    text: "Doğa ve spor dolu Palandöken deneyimi için başvuru ve bilgilendirme.",
  },
];

export default function SchoolStudentServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Ürünler ve Hizmetlerimiz"
        title="Okul Öğrencisine Açık Hizmetler"
        description="Kayıtlı öğrencilerimize açık gezi, yaz okulu ve destek programları."
      />
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        {items.map((item) => (
          <article key={item.href} className="border border-line bg-white px-5 py-6 sm:px-6">
            <h2 className="font-[family-name:var(--font-display)] text-xl text-navy sm:text-2xl">
              <Link href={item.href} className="hover:text-crimson">
                {item.title}
              </Link>
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted sm:text-base">{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
