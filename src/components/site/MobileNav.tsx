"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type NavItem = { href: string; label: string };

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-white/25 text-white transition hover:bg-white/10"
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
            <path
              d="M4 7h16M4 12h16M4 17h16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="fixed inset-x-0 top-[4.5rem] z-50 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-white/10 bg-navy-deep/98 shadow-2xl backdrop-blur-md sm:top-[5rem] sm:max-h-[calc(100dvh-5rem)]"
            aria-label="Mobil menü"
          >
            {items.map((item) => {
              const className =
                "block px-5 py-3.5 text-sm text-white/90 transition hover:bg-white/10 sm:text-base";

              if (item.href.startsWith("http")) {
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={className}
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={className}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
