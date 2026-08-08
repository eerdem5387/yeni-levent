import Image from "next/image";
import Link from "next/link";
import { DesktopNav } from "@/components/site/DesktopNav";
import { MobileNav } from "@/components/site/MobileNav";
import { siteNavItems } from "@/lib/nav";

type HeaderProps = {
  siteName: string;
};

export function SiteHeader({ siteName }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d0dae9]/80 bg-white/95 shadow-[0_4px_20px_rgba(8,42,94,0.06)] backdrop-blur-md">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-3.5 md:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <Image
            src="/theme/levent-akademik-logo.png"
            alt={`${siteName} logo`}
            width={100}
            height={100}
            className="h-auto w-auto max-w-[100px]"
            priority
          />
          <span className="sr-only">{siteName}</span>
        </Link>

        <DesktopNav items={siteNavItems} />
        <MobileNav items={siteNavItems} />
      </div>
    </header>
  );
}
