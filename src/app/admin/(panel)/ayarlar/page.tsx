import { AdminPageHeader } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { saveSettings } from "../actions";

const fieldClass =
  "w-full rounded-xl border border-[#d0dae9] bg-[#f8fbff] px-3.5 py-3 text-sm text-[#082a5e] outline-none transition focus:border-[#1363df] focus:ring-4 focus:ring-[#1363df]/15";

export default async function AdminSettingsPage() {
  const settings = await prisma.siteSetting.findUnique({ where: { id: "main" } });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Site Ayarları"
        description="İletişim bilgileri ve ana sayfa metinlerini güncelleyin."
      />

      <form
        action={saveSettings}
        className="space-y-4 rounded-2xl border border-[#e7effc] bg-white p-5 shadow-[0_10px_30px_rgba(8,42,94,0.04)] sm:p-6"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1.5 block font-medium text-[#39557e]">Site adı</span>
            <input name="siteName" defaultValue={settings?.siteName} className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-[#39557e]">Telefon</span>
            <input name="phone" defaultValue={settings?.phone} className={fieldClass} />
          </label>
          <label className="block text-sm">
            <span className="mb-1.5 block font-medium text-[#39557e]">E-posta</span>
            <input name="email" defaultValue={settings?.email} className={fieldClass} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1.5 block font-medium text-[#39557e]">Adres</span>
            <input name="address" defaultValue={settings?.address} className={fieldClass} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1.5 block font-medium text-[#39557e]">Hero başlık</span>
            <input name="heroTitle" defaultValue={settings?.heroTitle} className={fieldClass} />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1.5 block font-medium text-[#39557e]">Hero alt yazı</span>
            <textarea
              name="heroSubtitle"
              defaultValue={settings?.heroSubtitle}
              rows={3}
              className={fieldClass}
            />
          </label>
          <label className="block text-sm sm:col-span-2">
            <span className="mb-1.5 block font-medium text-[#39557e]">
              Ana sayfa hakkımızda özeti
            </span>
            <textarea
              name="aboutPreview"
              defaultValue={settings?.aboutPreview}
              rows={3}
              className={fieldClass}
            />
          </label>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-[#082a5e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1363df]"
        >
          Değişiklikleri Kaydet
        </button>
      </form>
    </div>
  );
}
