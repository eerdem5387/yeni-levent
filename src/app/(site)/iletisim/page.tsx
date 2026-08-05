import { ContactForm } from "@/components/site/ContactForm";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "İletişim" };

export default async function ContactPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "main" } });

  return (
    <div>
      <div className="brand-gradient px-4 pb-12 pt-8 text-white sm:px-5 sm:pb-16 md:px-8">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl">İletişim</h1>
          <p className="mt-4 max-w-xl text-white/80">Sorularınız için bize yazın.</p>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:gap-12 sm:px-5 sm:py-16 md:grid-cols-2 md:px-8">
        <div>
          <h2 className="font-[family-name:var(--font-display)] text-2xl text-navy">
            İletişim bilgileri
          </h2>
          <ul className="mt-6 space-y-4 text-muted">
            <li>
              <span className="block text-xs uppercase tracking-wider text-crimson">Adres</span>
              {settings?.address}
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wider text-crimson">Telefon</span>
              {settings?.phone}
            </li>
            <li>
              <span className="block text-xs uppercase tracking-wider text-crimson">E-posta</span>
              {settings?.email}
            </li>
          </ul>
        </div>
        <div>
          <h2 className="mb-6 font-[family-name:var(--font-display)] text-2xl text-navy">
            Mesaj formu
          </h2>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
