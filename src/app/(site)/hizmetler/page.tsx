import Link from "next/link";
import { PageHero } from "@/components/site/HomeSections";

export const metadata = { title: "Ürünler ve Hizmetlerimiz" };

const groups = [
  {
    href: "/hizmetler/okul-ogrencisi",
    title: "Okul Öğrencisine Açık Hizmetler",
    items: [
      { href: "/etkinlikler/tiflis-kultur-gezisi", label: "Tiflis Gezisi" },
      { href: "/etkinlikler/yaz-okulu-programi", label: "Yaz Okulu Programları" },
      {
        href: "/etkinlikler/palandoken-gezisi",
        label: "Palandöken Gezisi Başvuru Formu",
      },
    ],
  },
  {
    href: "/hizmetler/misafir-ogrenci",
    title: "Misafir ve Yabancı Öğrenciye Açık Hizmetler",
    items: [
      { href: "/hizmetler/misafir-ogrenci#kocluk", label: "Öğrenci Koçluk Hizmetleri" },
      { href: "/etkinlikler/tiflis-kultur-gezisi", label: "Tiflis Gezisi" },
      { href: "/etkinlikler/yaz-okulu-programi", label: "Yaz Okulu Programları" },
      { href: "/programlar", label: "Yabancı Dil Kursları" },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Hizmetler"
        title="Ürünler ve Hizmetlerimiz"
        description="Okul öğrencileri ile misafir / yabancı öğrencilere açık program ve hizmetler."
      />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 sm:gap-8 sm:px-5 sm:py-16 md:px-8">
        {groups.map((group) => (
          <article key={group.href} className="border border-line bg-white p-6 sm:p-7">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-navy">
              <Link href={group.href} className="hover:text-crimson">
                {group.title}
              </Link>
            </h2>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-navy">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
