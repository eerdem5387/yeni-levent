import { ContactForm } from "@/components/site/ContactForm";
import { siteContact } from "@/lib/contact";

export const metadata = { title: "İletişim" };

export default async function ContactPage() {
  return (
    <div>
      <div className="brand-gradient px-4 pb-10 pt-8 text-white sm:px-5 sm:pb-14 md:px-8 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-light">
            İletişim
          </p>
          <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl md:text-5xl">
            Bizimle İletişime Geç
          </h1>
          <div className="gold-rule mt-5 opacity-90" />
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80 sm:text-base">
            Sorularınız, kayıt ve ziyaret talepleriniz için bize ulaşın.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:gap-12 sm:px-5 sm:py-14 md:grid-cols-2 md:gap-14 md:px-8 md:py-16">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-navy sm:text-2xl">
            İletişim bilgileri
          </h2>
          <div className="gold-rule mt-4" />

          <ul className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-crimson">
                Adres
              </span>
              <p className="mt-1.5 text-sm leading-relaxed text-muted sm:text-base">
                {siteContact.addressLine1}
                <br />
                {siteContact.addressLine2}
              </p>
            </li>
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-crimson">
                Telefon
              </span>
              <a
                href="tel:+904642171555"
                className="mt-1.5 inline-block text-sm text-muted transition hover:text-navy sm:text-base"
              >
                {siteContact.phone}
              </a>
            </li>
            <li>
              <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-crimson">
                E-posta
              </span>
              <a
                href={`mailto:${siteContact.email}`}
                className="mt-1.5 inline-block break-all text-sm text-muted transition hover:text-navy sm:break-normal sm:text-base"
              >
                {siteContact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-display)] text-xl text-navy sm:text-2xl">
            Mesaj formu
          </h2>
          <div className="gold-rule mt-4 mb-6" />
          <ContactForm />
        </div>
      </div>

      <section className="border-t border-line bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-5 sm:py-14 md:px-8 md:py-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-crimson">
              Konum
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl text-navy sm:text-3xl">
              Okulumuzu haritada bulun
            </h2>
            <div className="gold-rule mt-5" />
          </div>

          <div className="mt-6 overflow-hidden border border-line bg-white sm:mt-8">
            <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] md:aspect-[21/9]">
              <iframe
                src={siteContact.mapUrl}
                title="Levent Koleji konum haritası"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
