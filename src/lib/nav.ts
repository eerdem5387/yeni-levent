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
  { href: "/kadro", label: "Kadromuz" },
  { href: "/etkinlikler", label: "Etkinliklerimiz" },
  { href: "/geziler", label: "Geziler" },
  {
    href: "/yarisma",
    label: "Turnuvalar",
    children: [
      { href: "/yarisma", label: "Bilgi Yarışması" },
      { href: "/turnuva", label: "Satranç & Mangala" },
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
