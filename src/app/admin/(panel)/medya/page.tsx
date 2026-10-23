import Image from "next/image";
import { AdminEmptyState, AdminPageHeader } from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    where: { folder: "staff" },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Medya Kütüphanesi"
        description={`Kadro fotoğrafları · ${assets.length} görsel. Kadro formundan “Kütüphaneden seç” ile kullanabilirsiniz.`}
      />

      {assets.length === 0 ? (
        <AdminEmptyState
          title="Henüz görsel yok"
          description="Kadro formundan yeni fotoğraf yüklediğinizde burada listelenir."
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {assets.map((asset) => (
            <article
              key={asset.id}
              className="overflow-hidden rounded-2xl border border-[#e7effc] bg-white shadow-[0_8px_24px_rgba(8,42,94,0.04)]"
            >
              <div className="relative aspect-[4/5] bg-[#e7effc]">
                <Image
                  src={asset.url}
                  alt={asset.alt || asset.filename}
                  fill
                  className="object-cover object-top"
                  unoptimized
                />
              </div>
              <div className="space-y-1 p-3">
                <p className="truncate text-sm font-medium text-[#082a5e]">
                  {asset.alt || asset.filename}
                </p>
                <p className="truncate text-[11px] text-[#39557e]">{asset.filename}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
