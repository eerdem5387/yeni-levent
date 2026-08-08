export type NavChild = {
  href: string;
  label: string;
  children?: NavChild[];
};

export type NavItem = {
  href: string;
  label: string;
  children?: NavChild[];
};

/** Navigation mirrored from leventokullari.com (school content only). */
export const siteNavItems: NavItem[] = [
  { href: "/", label: "Anasayfa" },
  {
    href: "https://basvuru.leventokullari.com/",
    label: "Bursluluk Sınavı Başvurusu",
  },
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/etkinlikler", label: "Etkinliklerimiz" },
  {
    href: "/hizmetler",
    label: "Ürünler ve Hizmetlerimiz",
    children: [
      {
        href: "/hizmetler/okul-ogrencisi",
        label: "Okul Öğrencisine Açık Hizmetler",
        children: [
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
        label: "Misafir ve Yabancı Öğrenciye Açık Hizmetler",
        children: [
          { href: "/hizmetler/misafir-ogrenci#kocluk", label: "Öğrenci Koçluk Hizmetleri" },
          { href: "/etkinlikler/tiflis-kultur-gezisi", label: "Tiflis Gezisi" },
          { href: "/etkinlikler/yaz-okulu-programi", label: "Yaz Okulu Programları" },
          { href: "/programlar", label: "Yabancı Dil Kursları" },
        ],
      },
    ],
  },
  {
    href: "/iletisim",
    label: "İletişim",
    children: [
      {
        href: "https://ik.leventokullari.com/",
        label: "Çalışma Arkadaşları Arıyoruz!",
      },
    ],
  },
  { href: "https://ik.leventokullari.com/", label: "İş Başvurusu" },
];

export function flattenNavItems(items: NavItem[] = siteNavItems): { href: string; label: string }[] {
  const out: { href: string; label: string }[] = [];

  function walk(nodes: NavChild[], prefix = "") {
    for (const node of nodes) {
      out.push({
        href: node.href,
        label: prefix ? `${prefix} / ${node.label}` : node.label,
      });
      if (node.children?.length) {
        walk(node.children, node.label);
      }
    }
  }

  walk(items);
  return out;
}
