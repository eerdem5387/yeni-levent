import { ExportExcelButton } from "@/components/admin/ExportExcelButton";
import {
  AdminBadge,
  AdminEmptyState,
  AdminGhostButton,
  AdminPageHeader,
  AdminRecordCard,
} from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import {
  deleteCompetitionApplication,
  markCompetitionApplicationRead,
} from "../actions";

export default async function AdminCompetitionApplicationsPage() {
  const applications = await prisma.competitionApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      members: { orderBy: { order: "asc" } },
    },
  });
  const unread = applications.filter((a) => !a.read).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Yarışma Başvuruları"
        description={`Lise Bilgi Yarışması · ${applications.length} başvuru · ${unread} yeni`}
        action={
          <ExportExcelButton
            href="/api/admin/export/competition"
            label="Excel İndir"
          />
        }
      />

      {applications.length === 0 ? (
        <AdminEmptyState
          title="Henüz yarışma başvurusu yok"
          description="Bireysel yarışma başvuruları burada listelenir."
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <AdminRecordCard key={app.id} unread={!app.read}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-[#082a5e]">
                      {app.members[0]?.fullName || "İsimsiz başvuru"}
                    </h2>
                    {!app.read ? <AdminBadge tone="info">Yeni</AdminBadge> : null}
                    <AdminBadge>{app.members[0]?.classSection || "—"}</AdminBadge>
                  </div>
                  <p className="mt-3 text-xs text-[#39557e]/80">{app.competitionTitle}</p>
                </div>
                <time className="text-xs text-[#39557e]/80">
                  {new Date(app.createdAt).toLocaleString("tr-TR")}
                </time>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {!app.read && (
                  <form action={markCompetitionApplicationRead}>
                    <input type="hidden" name="id" value={app.id} />
                    <AdminGhostButton>Okundu işaretle</AdminGhostButton>
                  </form>
                )}
                <form action={deleteCompetitionApplication}>
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
