import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  Mail,
  MapPinned,
  Trophy,
  Users,
} from "lucide-react";
import { AdminPageHeader } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [
    events,
    messages,
    staff,
    unread,
    competitionApps,
    unreadCompetition,
    tripApps,
    unreadTrips,
  ] = await Promise.all([
    prisma.event.count(),
    prisma.contactMessage.count(),
    prisma.staff.count(),
    prisma.contactMessage.count({ where: { read: false } }),
    prisma.competitionApplication.count(),
    prisma.competitionApplication.count({ where: { read: false } }),
    prisma.tripApplication.count(),
    prisma.tripApplication.count({ where: { read: false } }),
  ]);

  const attention = unread + unreadCompetition + unreadTrips;

  const cards = [
    {
      label: "Etkinlikler",
      value: events,
      href: "/admin/etkinlikler",
      icon: CalendarDays,
      tone: "bg-[#e7effc] text-[#1363df]",
    },
    {
      label: "Kadro",
      value: staff,
      href: "/admin/kadro",
      icon: Users,
      tone: "bg-[#e8f8ef] text-[#0f7a45]",
    },
    {
      label: "Mesajlar",
      value: messages,
      href: "/admin/mesajlar",
      note: unread ? `${unread} okunmamış` : "Hepsi okundu",
      icon: Mail,
      tone: "bg-[#fff4db] text-[#9a6b00]",
    },
    {
      label: "Yarışma Başvuruları",
      value: competitionApps,
      href: "/admin/yarisma-basvurulari",
      note: unreadCompetition ? `${unreadCompetition} yeni` : "Yeni başvuru yok",
      icon: Trophy,
      tone: "bg-[#f3e8ff] text-[#7c3aed]",
    },
    {
      label: "Gezi Başvuruları",
      value: tripApps,
      href: "/admin/gezi-basvurulari",
      note: unreadTrips ? `${unreadTrips} yeni` : "Yeni başvuru yok",
      icon: MapPinned,
      tone: "bg-[#e0f2fe] text-[#0369a1]",
    },
  ];

  const shortcuts = [
    { href: "/admin/gezi-basvurulari", label: "Gezi başvurularını incele" },
    { href: "/admin/yarisma-basvurulari", label: "Yarışma başvurularını incele" },
    { href: "/admin/mesajlar", label: "Gelen mesajları aç" },
    { href: "/admin/ayarlar", label: "Site ayarlarını güncelle" },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Kontrol Paneli"
        description="Başvurular, içerikler ve site ayarlarını tek yerden yönetin."
      />

      <section className="overflow-hidden rounded-3xl border border-[#d0dae9]/80 bg-[linear-gradient(135deg,#082a5e_0%,#1363df_100%)] p-6 text-white shadow-[0_20px_50px_rgba(8,42,94,0.18)] sm:p-8">
        <p className="text-sm text-white/75">Hoş geldiniz</p>
        <h2 className="mt-2 max-w-xl font-[family-name:var(--font-display)] text-2xl font-semibold leading-snug sm:text-3xl">
          Bugün takip edilmesi gereken {attention} yeni kayıt var.
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/80">
          Okunmamış mesajlar ile yeni yarışma ve gezi başvuruları burada özetlenir.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-[#e7effc] bg-white p-5 shadow-[0_10px_30px_rgba(8,42,94,0.05)] transition hover:-translate-y-0.5 hover:border-[#1363df]/25 hover:shadow-[0_16px_40px_rgba(19,99,223,0.12)]"
          >
            <div className="flex items-start justify-between gap-3">
              <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.tone}`}>
                <card.icon className="h-5 w-5" aria-hidden />
              </span>
              <ArrowUpRight className="h-4 w-4 text-[#39557e]/50 transition group-hover:text-[#1363df]" />
            </div>
            <p className="mt-5 text-sm font-medium text-[#39557e]">{card.label}</p>
            <p className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-[#082a5e]">
              {card.value}
            </p>
            {card.note ? (
              <p className="mt-2 text-xs font-medium text-[#1363df]">{card.note}</p>
            ) : (
              <p className="mt-2 text-xs text-[#39557e]/70">Detayları görüntüle</p>
            )}
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-[#e7effc] bg-white p-5 shadow-[0_10px_30px_rgba(8,42,94,0.04)] sm:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[#082a5e]">
          Hızlı işlemler
        </h3>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {shortcuts.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-xl border border-[#e7effc] bg-[#f4f7fb] px-4 py-3 text-sm font-medium text-[#082a5e] transition hover:border-[#1363df]/30 hover:bg-white"
            >
              {item.label}
              <ArrowUpRight className="h-4 w-4 text-[#1363df]" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
