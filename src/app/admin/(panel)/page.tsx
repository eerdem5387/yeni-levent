import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [events, messages, staff, programs, unread] = await Promise.all([
    prisma.event.count(),
    prisma.contactMessage.count(),
    prisma.staff.count(),
    prisma.program.count(),
    prisma.contactMessage.count({ where: { read: false } }),
  ]);

  const cards = [
    { label: "Etkinlikler", value: events, href: "/admin/etkinlikler" },
    { label: "Programlar", value: programs, href: "/admin/programlar" },
    { label: "Kadro", value: staff, href: "/admin/kadro" },
    { label: "Mesajlar", value: messages, href: "/admin/mesajlar", note: `${unread} okunmamış` },
  ];

  return (
    <div>
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">Özet</h1>
      <p className="mt-2 text-muted">Site içeriklerinizi buradan yönetin.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="border border-line bg-white p-5 transition hover:border-navy/30"
          >
            <p className="text-xs uppercase tracking-wider text-muted">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-navy">{card.value}</p>
            {card.note && <p className="mt-1 text-xs text-crimson">{card.note}</p>}
          </Link>
        ))}
      </div>
    </div>
  );
}
