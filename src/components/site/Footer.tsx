import Image from "next/image";
import Link from "next/link";

type FooterProps = {
  siteName: string;
  phone: string;
  email: string;
  address: string;
};

export function SiteFooter({ siteName, phone, email, address }: FooterProps) {
  return (
    <footer className="mt-auto bg-navy-deep text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:gap-10 sm:px-5 sm:py-14 md:grid-cols-[1.2fr_1fr_1fr] md:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/logo.png" alt="" width={48} height={48} className="h-12 w-12" />
            <p className="font-[family-name:var(--font-display)] text-xl">{siteName}</p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/70">
            Akademik başarı, güçlü rehberlik ve karakter gelişimini bir arada sunan eğitim
            anlayışı.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
            Keşfet
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link href="/hakkimizda" className="hover:text-white">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/programlar" className="hover:text-white">
                Programlar
              </Link>
            </li>
            <li>
              <Link href="/etkinlikler" className="hover:text-white">
                Etkinliklerimiz
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-white">
                İletişim
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-gold-light">
            İletişim
          </p>
          <ul className="space-y-2 text-sm text-white/75">
            <li>{address}</li>
            <li>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-white">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="hover:text-white">
                {email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-5 md:px-8">
        © {new Date().getFullYear()} {siteName}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
