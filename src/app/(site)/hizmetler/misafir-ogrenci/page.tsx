import Link from "next/link";
import { PageHero } from "@/components/site/HomeSections";

export const metadata = { title: "Misafir ve Yabancı Öğrenci Hizmetleri" };

const items = [
  {
    id: "kocluk",
    href: "/iletisim",
    title: "Öğrenci Koçluk Hizmetleri",
    text: "Misafir ve yabancı öğrencilere akademik ve kişisel gelişim odaklı koçluk desteği.",
  },
  {
    href: "/etkinlikler/tiflis-kultur-gezisi",
    title: "Tiflis Gezisi",
    text: "Kültür ve dil deneyimini bir araya getiren yurt dışı programı.",
  },
  {
    href: "/etkinlikler/yaz-okulu-programi",
    title: "Yaz Okulu Programları",
    text: "Yaz döneminde akademik destek ve sosyal etkinlikler.",
  },
  {
    href: "/programlar",
    title: "Yabancı Dil Kursları",
    text: "İletişim odaklı dil eğitimi ile etkili konuşma ve akademik dil becerileri.",
  },
];

export default function GuestStudentServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Ürünler ve Hizmetlerimiz"
        title="Misafir ve Yabancı Öğrenciye Açık Hizmetler"
        description="Misafir ve yabancı öğrencilerimize özel koçluk, dil ve gezi programları."
      />
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-12 sm:px-5 sm:py-16 md:px-8">
        {items.map((item) => (
          <article
            key={item.title}
            id={item.id}
            className="scroll-mt-28 border border-line bg-white px-5 py-6 sm:px-6"
          >
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
