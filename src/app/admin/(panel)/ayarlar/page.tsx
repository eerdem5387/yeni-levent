import { prisma } from "@/lib/prisma";
import { saveSettings } from "../actions";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "main" } });

  return (
    <div className="space-y-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">Site Ayarları</h1>
      <form action={saveSettings} className="space-y-3 border border-line bg-white p-5">
        <input
          name="siteName"
          defaultValue={settings?.siteName}
          placeholder="Site adı"
          className="w-full border border-line px-3 py-2"
        />
        <input
          name="phone"
          defaultValue={settings?.phone}
          placeholder="Telefon"
          className="w-full border border-line px-3 py-2"
        />
        <input
          name="email"
          defaultValue={settings?.email}
          placeholder="E-posta"
          className="w-full border border-line px-3 py-2"
        />
        <input
          name="address"
          defaultValue={settings?.address}
          placeholder="Adres"
          className="w-full border border-line px-3 py-2"
        />
        <input
          name="heroTitle"
          defaultValue={settings?.heroTitle}
          placeholder="Hero başlık"
          className="w-full border border-line px-3 py-2"
        />
        <textarea
          name="heroSubtitle"
          defaultValue={settings?.heroSubtitle}
          rows={3}
          placeholder="Hero alt yazı"
          className="w-full border border-line px-3 py-2"
        />
        <textarea
          name="aboutPreview"
          defaultValue={settings?.aboutPreview}
          rows={3}
          placeholder="Ana sayfa hakkımızda özeti"
          className="w-full border border-line px-3 py-2"
        />
        <button className="bg-navy px-4 py-2 text-sm text-white">Kaydet</button>
      </form>
    </div>
  );
}
