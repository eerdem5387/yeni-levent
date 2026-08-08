"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NavItem } from "@/lib/nav";

function isExternal(href: string) {
  return href.startsWith("http");
}

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#d0dae9] text-[#082a5e] transition hover:bg-[#e7effc]"
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
            className="fixed inset-0 z-40 bg-[#061e43]/45"
            onClick={() => setOpen(false)}
            aria-hidden
          />
          <nav
            className="fixed inset-x-0 top-[4.25rem] z-50 max-h-[calc(100dvh-4.25rem)] overflow-y-auto border-b border-[#d0dae9] bg-white shadow-lg sm:top-[4.75rem] sm:max-h-[calc(100dvh-4.75rem)]"
            aria-label="Mobil menü"
          >
            {items.map((item) => {
              const key = `${item.href}-${item.label}`;
              const hasChildren = Boolean(item.children?.length);

              return (
                <div key={key} className="border-b border-[#e7effc]">
                  <div className="flex items-center">
                    {isExternal(item.href) ? (
                      <a
                        href={item.href}
                        rel="noopener noreferrer"
                        className="flex-1 px-5 py-3.5 text-sm font-medium text-[#082a5e]"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex-1 px-5 py-3.5 text-sm font-medium text-[#082a5e]"
                        onClick={() => setOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                    {hasChildren ? (
                      <button
                        type="button"
                        className="px-4 py-3.5 text-[#1363df]"
                        aria-label={`${item.label} alt menü`}
                        onClick={() =>
                          setExpanded((prev) => (prev === key ? null : key))
                        }
                      >
                        {expanded === key ? "−" : "+"}
                      </button>
                    ) : null}
                  </div>

                  {hasChildren && expanded === key ? (
                    <div className="bg-[#f4f7fb] pb-2">
                      {item.children!.map((child) => (
                        <div key={`${child.href}-${child.label}`}>
                          {isExternal(child.href) ? (
                            <a
                              href={child.href}
                              rel="noopener noreferrer"
                              className="block px-8 py-2.5 text-sm text-[#39557e]"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </a>
                          ) : (
                            <Link
                              href={child.href}
                              className="block px-8 py-2.5 text-sm text-[#39557e]"
                              onClick={() => setOpen(false)}
                            >
                              {child.label}
                            </Link>
                          )}
                          {child.children?.map((grand) =>
                            isExternal(grand.href) ? (
                              <a
                                key={`${grand.href}-${grand.label}`}
                                href={grand.href}
                                rel="noopener noreferrer"
                                className="block px-12 py-2 text-xs text-[#39557e]/80"
                                onClick={() => setOpen(false)}
                              >
                                {grand.label}
                              </a>
                            ) : (
                              <Link
                                key={`${grand.href}-${grand.label}`}
                                href={grand.href}
                                className="block px-12 py-2 text-xs text-[#39557e]/80"
                                onClick={() => setOpen(false)}
                              >
                                {grand.label}
                              </Link>
                            ),
                          )}
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>
        </>
      )}
    </div>
  );
}
