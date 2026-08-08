import Image from "next/image";
import Link from "next/link";
import { siteContact } from "@/lib/contact";

type FooterProps = {
  siteName: string;
  phone: string;
  email: string;
  address: string;
};

export function SiteFooter({ siteName, phone, email, address }: FooterProps) {
  return (
    <footer className="mt-auto bg-[#061e43] text-white">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-4 py-14 sm:grid-cols-2 sm:px-5 md:grid-cols-[1.1fr_1.3fr_1fr] md:px-8">
        <div>
          <div className="mb-5">
            <Image
              src="/theme/levent-akademik-logo.png"
              alt={siteName}
              width={120}
              height={120}
              className="h-16 w-auto"
            />
          </div>
          <ul className="space-y-2 text-sm text-white/75">
            <li>{address || siteContact.address}</li>
            <li>
              <a href="tel:+904642171555" className="hover:text-[#fab123]">
                {phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${email}`} className="hover:text-[#fab123]">
                {email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Kaynaklar
          </p>
          <ul className="columns-1 gap-x-8 space-y-2.5 text-sm text-white/75 sm:columns-2">
            <li>
              <Link href="/" className="hover:text-[#fab123]">
                Anasayfa
              </Link>
            </li>
            <li>
              <a
                href="https://basvuru.leventokullari.com/"
                rel="noopener noreferrer"
                className="hover:text-[#fab123]"
              >
                Bursluluk Sınavı Başvurusu
              </a>
            </li>
            <li>
              <Link href="/hakkimizda" className="hover:text-[#fab123]">
                Hakkımızda
              </Link>
            </li>
            <li>
              <Link href="/etkinlikler" className="hover:text-[#fab123]">
                Etkinliklerimiz
              </Link>
            </li>
            <li>
              <Link href="/hizmetler" className="hover:text-[#fab123]">
                Ürünler ve Hizmetlerimiz
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-[#fab123]">
                İletişim
              </Link>
            </li>
            <li>
              <a
                href="https://ik.leventokullari.com/"
                rel="noopener noreferrer"
                className="hover:text-[#fab123]"
              >
                İş Başvurusu
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="mb-4 font-[family-name:var(--font-display)] text-lg font-semibold text-white">
            Hızlı Erişim
          </p>
          <div className="space-y-3">
            <a
              href="https://basvuru.leventokullari.com/"
              rel="noopener noreferrer"
              className="block rounded border border-white/20 px-4 py-3 text-sm transition hover:border-[#fab123] hover:text-[#fab123]"
            >
              Bursluluk Başvurusu
            </a>
            <a
              href="https://ik.leventokullari.com/"
              rel="noopener noreferrer"
              className="block rounded bg-[#1363df] px-4 py-3 text-sm font-semibold transition hover:bg-[#2494e4]"
            >
              Çalışma Arkadaşları Arıyoruz
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs text-white/50 sm:px-5 md:px-8">
        <p>Powered By Levent College · © {new Date().getFullYear()} {siteName}</p>
        <p className="mt-2 flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <Link href="/iletisim" className="hover:text-[#fab123]">
            Gizlilik ve Güvenlik Politikası
          </Link>
          <span aria-hidden>·</span>
          <Link href="/iletisim" className="hover:text-[#fab123]">
            İptal ve İade Politikası
          </Link>
          <span aria-hidden>·</span>
          <Link href="/iletisim" className="hover:text-[#fab123]">
            Mesafeli Satış Sözleşmesi
          </Link>
        </p>
      </div>
    </footer>
  );
}
