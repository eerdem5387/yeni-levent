"use client";

import Link from "next/link";
import type { NavChild, NavItem } from "@/lib/nav";

function isExternal(href: string) {
  return href.startsWith("http");
}

function LinkOrA({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  if (isExternal(href)) {
    return (
      <a href={href} className={className} rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

function SubMenu({ items }: { items: NavChild[] }) {
  return (
    <div className="invisible absolute left-0 top-full z-50 min-w-[260px] pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
      <div className="rounded-lg border border-[#d0dae9] bg-white py-2 shadow-[0_16px_40px_rgba(8,42,94,0.12)]">
        {items.map((item) => (
          <div key={`${item.href}-${item.label}`} className="group/item relative">
            <LinkOrA
              href={item.href}
              className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm text-[#082a5e] transition hover:bg-[#e7effc] hover:text-[#1363df]"
            >
              <span>{item.label}</span>
              {item.children?.length ? (
                <span className="text-[#1363df]" aria-hidden>
                  ›
                </span>
              ) : null}
            </LinkOrA>
            {item.children?.length ? (
              <div className="invisible absolute left-full top-0 z-50 min-w-[230px] pl-1 opacity-0 transition group-hover/item:visible group-hover/item:opacity-100">
                <div className="rounded-lg border border-[#d0dae9] bg-white py-2 shadow-[0_16px_40px_rgba(8,42,94,0.12)]">
                  {item.children.map((child) => (
                    <LinkOrA
                      key={`${child.href}-${child.label}`}
                      href={child.href}
                      className="block px-4 py-2.5 text-sm text-[#082a5e] transition hover:bg-[#e7effc] hover:text-[#1363df]"
                    >
                      {child.label}
                    </LinkOrA>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DesktopNav({ items }: { items: NavItem[] }) {
  return (
    <nav className="hidden items-center gap-0 xl:flex">
      {items.map((item) => {
        const hasChildren = Boolean(item.children?.length);
        return (
          <div key={`${item.href}-${item.label}`} className="group relative">
            <LinkOrA
              href={item.href}
              className="inline-flex items-center gap-1 px-2 py-2 text-[14px] font-medium text-[#082a5e] transition hover:text-[#1363df] xl:px-2.5 xl:text-[15px]"
            >
              {item.label}
              {hasChildren ? (
                <span className="text-[10px] text-[#1363df]" aria-hidden>
                  ▾
                </span>
              ) : null}
            </LinkOrA>
            {hasChildren ? <SubMenu items={item.children!} /> : null}
          </div>
        );
      })}
    </nav>
  );
}
