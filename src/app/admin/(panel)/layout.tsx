import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { SignOutButton } from "@/components/admin/SignOutButton";

const links = [
  { href: "/admin/etkinlikler", label: "Etkinlikler" },
  { href: "/admin/kadro", label: "Kadro" },
  { href: "/admin/ayarlar", label: "Ayarlar" },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-cream">
      <div className="flex min-h-screen">
        <aside className="hidden w-60 shrink-0 bg-navy-deep text-white md:flex md:flex-col">
          <div className="border-b border-white/10 px-5 py-5">
            <p className="font-[family-name:var(--font-display)] text-lg">Levent Koleji</p>
            <p className="text-xs text-white/60">Yönetim Paneli</p>
          </div>
          <nav className="flex-1 space-y-1 p-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-sm px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-white/10 p-4">
            <p className="mb-2 truncate text-xs text-white/60">{session.user?.email}</p>
            <SignOutButton />
            <Link href="/" className="mt-3 block text-xs text-gold-light hover:underline">
              Siteye dön →
            </Link>
          </div>
        </aside>
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between border-b border-line bg-white px-5 py-4 md:hidden">
            <p className="font-semibold text-navy">Yönetim</p>
            <SignOutButton />
          </header>
          <nav className="flex gap-2 overflow-x-auto border-b border-line bg-white px-3 py-2 md:hidden">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-sm bg-cream px-3 py-1.5 text-xs text-navy"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <main className="flex-1 p-5 md:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
