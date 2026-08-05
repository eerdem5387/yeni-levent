import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/site/MobileNav";
import { siteNavItems } from "@/lib/nav";

const navLinkClass =
  "rounded-sm px-2.5 py-2 text-sm text-white/85 transition hover:bg-white/10 hover:text-white xl:px-3";

function NavItem({
  item,
  className,
}: {
  item: { href: string; label: string };
  className: string;
}) {
  if (item.href.startsWith("http")) {
    return (
      <a href={item.href} className={className} rel="noopener noreferrer">
        {item.label}
      </a>
    );
  }

  return (
    <Link href={item.href} className={className}>
      {item.label}
    </Link>
  );
}

type HeaderProps = {
  siteName: string;
};

export function SiteHeader({ siteName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-navy-deep/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-5 sm:py-5 md:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Image
            src="/logo.png"
            alt={`${siteName} logo`}
            width={56}
            height={56}
            className="h-10 w-10 shrink-0 rounded-full shadow-[0_0_0_2px_rgba(216,180,72,0.55)] transition duration-300 group-hover:scale-[1.03] sm:h-12 sm:w-12 md:h-14 md:w-14"
            priority
          />
          <div className="min-w-0 leading-tight">
            <p className="truncate font-[family-name:var(--font-display)] text-base tracking-wide text-white sm:text-lg md:text-xl">
              {siteName}
            </p>
            <p className="hidden text-xs uppercase tracking-[0.18em] text-gold-light/90 sm:block">
              2018&apos;den beri
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex xl:gap-1">
          {siteNavItems.map((item) => (
            <NavItem key={item.href} item={item} className={navLinkClass} />
          ))}
        </nav>

        <MobileNav items={[...siteNavItems]} />
      </div>
    </header>
  );
}
