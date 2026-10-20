"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ExternalLink, Menu, X } from "lucide-react";
import { adminNavItems } from "@/lib/admin-nav";
import { AdminNavIcon } from "@/components/admin/AdminNavIcon";
import { SignOutButton } from "@/components/admin/SignOutButton";

function isActivePath(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLinks({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="space-y-1">
      {adminNavItems.map((item) => {
        const active = isActivePath(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-white text-[#082a5e] shadow-[0_8px_20px_rgba(8,42,94,0.12)]"
                : "text-white/75 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${
                active
                  ? "bg-[#e7effc] text-[#1363df]"
                  : "bg-white/10 text-white/80 group-hover:bg-white/15"
              }`}
            >
              <AdminNavIcon name={item.icon} />
            </span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function AdminShell({
  email,
  children,
}: {
  email?: string | null;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = adminNavItems.find((item) => isActivePath(pathname, item.href));

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef3fb_0%,#f7f9fc_40%,#f4f7fb_100%)]">
      <div className="flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[272px] shrink-0 flex-col overflow-y-auto bg-[linear-gradient(180deg,#061e43_0%,#082a5e_55%,#0a3570_100%)] px-4 py-5 text-white md:flex">
          <div className="mb-6 flex items-center gap-3 rounded-2xl bg-white/5 px-3 py-3 ring-1 ring-white/10">
            <Image
              src="/theme/levent-akademik-logo.png"
              alt="Levent Koleji"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full bg-white object-contain p-0.5"
            />
            <div className="min-w-0">
              <p className="truncate font-[family-name:var(--font-display)] text-sm font-semibold">
                Levent Koleji
              </p>
              <p className="text-[11px] text-white/55">Yönetim Paneli</p>
            </div>
          </div>

          <div className="flex-1">
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/40">
              Menü
            </p>
            <NavLinks pathname={pathname} />
          </div>

          <div className="mt-6 space-y-3 rounded-2xl bg-white/5 p-3 ring-1 ring-white/10">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-white/45">Oturum</p>
              <p className="mt-1 truncate text-sm text-white/90">{email}</p>
            </div>
            <SignOutButton />
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#ffc94a] transition hover:text-white"
            >
              Siteye dön
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </Link>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-[#d0dae9]/80 bg-white/85 backdrop-blur-md">
            <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex min-w-0 items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d0dae9] bg-white text-[#082a5e] md:hidden"
                  onClick={() => setOpen(true)}
                  aria-label="Menüyü aç"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1363df]">
                    Yönetim
                  </p>
                  <p className="truncate font-[family-name:var(--font-display)] text-base font-semibold text-[#082a5e]">
                    {current?.label ?? "Panel"}
                  </p>
                </div>
              </div>
              <div className="hidden items-center gap-3 sm:flex">
                <span className="rounded-full bg-[#e7effc] px-3 py-1.5 text-xs font-medium text-[#1363df]">
                  {email}
                </span>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 lg:px-8">{children}</main>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-[#061e43]/50 backdrop-blur-sm"
            aria-label="Menüyü kapat"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[86%] max-w-xs flex-col bg-[linear-gradient(180deg,#061e43_0%,#082a5e_100%)] p-4 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-[family-name:var(--font-display)] text-sm font-semibold">
                Menü
              </p>
              <button
                type="button"
                className="rounded-lg bg-white/10 p-2"
                onClick={() => setOpen(false)}
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} />
            <div className="mt-auto space-y-3 border-t border-white/10 pt-4">
              <p className="truncate text-xs text-white/70">{email}</p>
              <SignOutButton />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
