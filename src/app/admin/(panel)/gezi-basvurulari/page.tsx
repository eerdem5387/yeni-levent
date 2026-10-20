import { ExportExcelButton } from "@/components/admin/ExportExcelButton";
import {
  AdminBadge,
  AdminEmptyState,
  AdminGhostButton,
  AdminPageHeader,
  AdminRecordCard,
} from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deleteTripApplication, markTripApplicationRead } from "../actions";

export default async function AdminTripApplicationsPage() {
  const applications = await prisma.tripApplication.findMany({
    orderBy: { createdAt: "desc" },
  });
  const unread = applications.filter((a) => !a.read).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Gezi Başvuruları"
        description={`Tiflis Gezisi · ${applications.length} başvuru · ${unread} yeni`}
        action={
          <ExportExcelButton
            href="/api/admin/export/trips"
            label="Excel İndir"
          />
        }
      />

      {applications.length === 0 ? (
        <AdminEmptyState
          title="Henüz gezi başvurusu yok"
          description="Sitedeki gezi formundan gelen kayıtlar burada görünür."
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <AdminRecordCard key={app.id} unread={!app.read}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-[#082a5e]">{app.fullName}</h2>
                    {!app.read ? <AdminBadge tone="info">Yeni</AdminBadge> : null}
                    <AdminBadge>{app.classSection}</AdminBadge>
                  </div>
                  <div className="mt-3 grid gap-1.5 text-sm text-[#39557e] sm:grid-cols-2">
                    <p>
                      Telefon:{" "}
                      <a
                        href={`tel:${app.phone.replace(/\s/g, "")}`}
                        className="font-medium text-[#1363df] hover:underline"
                      >
                        {app.phone}
                      </a>
                    </p>
                    <p>
                      Veli: <span className="font-medium text-[#082a5e]">{app.parentName}</span>
                    </p>
                  </div>
                  <p className="mt-3 text-xs text-[#39557e]/80">{app.tripTitle}</p>
                </div>
                <time className="text-xs text-[#39557e]/80">
                  {new Date(app.createdAt).toLocaleString("tr-TR")}
                </time>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {!app.read && (
                  <form action={markTripApplicationRead}>
                    <input type="hidden" name="id" value={app.id} />
                    <AdminGhostButton>Okundu işaretle</AdminGhostButton>
                  </form>
                )}
                <form action={deleteTripApplication}>
                  <input type="hidden" name="id" value={app.id} />
                  <AdminGhostButton tone="danger">Sil</AdminGhostButton>
                </form>
              </div>
            </AdminRecordCard>
          ))}
        </div>
      )}
    </div>
  );
}
