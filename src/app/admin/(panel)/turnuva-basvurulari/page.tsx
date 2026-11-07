import { ExportExcelButton } from "@/components/admin/ExportExcelButton";
import {
  AdminBadge,
  AdminEmptyState,
  AdminGhostButton,
  AdminPageHeader,
  AdminRecordCard,
} from "@/components/admin/ui";
import { prisma } from "@/lib/prisma";
import { deleteTournamentApplication } from "../actions";

function gameLabels(chess: boolean, mangala: boolean) {
  const labels: string[] = [];
  if (chess) labels.push("Satranç");
  if (mangala) labels.push("Mangala");
  return labels;
}

export default async function AdminTournamentApplicationsPage() {
  const applications = await prisma.tournamentApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Turnuva Başvuruları"
        description={`Satranç ve Mangala · ${applications.length} başvuru`}
        action={
          <ExportExcelButton
            href="/api/admin/export/tournament"
            label="Excel İndir"
          />
        }
      />

      {applications.length === 0 ? (
        <AdminEmptyState
          title="Henüz turnuva başvurusu yok"
          description="Satranç ve mangala başvuruları burada listelenir."
        />
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <AdminRecordCard key={app.id}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-semibold text-[#082a5e]">{app.fullName}</h2>
                    <AdminBadge>{app.classSection}</AdminBadge>
                    {gameLabels(app.chess, app.mangala).map((label) => (
                      <AdminBadge key={label}>{label}</AdminBadge>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-[#39557e]/80">{app.tournamentTitle}</p>
                </div>
                <time className="text-xs text-[#39557e]/80">
                  {new Date(app.createdAt).toLocaleString("tr-TR")}
                </time>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <form action={deleteTournamentApplication}>
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
