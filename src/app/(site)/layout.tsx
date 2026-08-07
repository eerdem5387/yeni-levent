import { SiteFooter } from "@/components/site/Footer";
import { SiteHeader } from "@/components/site/Header";
import { siteContact } from "@/lib/contact";
import { prisma } from "@/lib/prisma";

async function getSettings() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "main" } });
  return (
    settings ?? {
      siteName: "Levent Koleji",
      phone: siteContact.phone,
      email: siteContact.email,
      address: siteContact.address,
    }
  );
}

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings();

  return (
    <>
      <SiteHeader siteName={settings.siteName} />
      <main className="flex-1">{children}</main>
      <SiteFooter
        siteName={settings.siteName}
        phone={settings.phone}
        email={settings.email}
        address={settings.address}
      />
    </>
  );
}
