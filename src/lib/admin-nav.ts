export const adminNavItems = [
  { href: "/admin", label: "Özet", icon: "layout" as const },
  { href: "/admin/etkinlikler", label: "Etkinlikler", icon: "calendar" as const },
  { href: "/admin/kadro", label: "Kadro", icon: "users" as const },
  { href: "/admin/medya", label: "Medya", icon: "images" as const },
  { href: "/admin/mesajlar", label: "Mesajlar", icon: "mail" as const },
  { href: "/admin/yarisma-basvurulari", label: "Yarışma", icon: "trophy" as const },
  { href: "/admin/gezi-basvurulari", label: "Geziler", icon: "map" as const },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: "settings" as const },
] as const;

export type AdminNavIcon = (typeof adminNavItems)[number]["icon"];
