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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">
          Yarışma Başvuruları
        </h1>
        <p className="mt-2 text-sm text-muted">
          Lise Bilgi Yarışması takım başvuruları · {applications.length} başvuru
        </p>
      </div>

      {applications.length === 0 && (
        <p className="text-muted">Henüz yarışma başvurusu yok.</p>
      )}

      {applications.map((app) => (
        <article
          key={app.id}
          className={`border border-line bg-white p-5 ${
            app.read ? "opacity-80" : "border-l-4 border-l-crimson"
          }`}
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="font-semibold text-navy">{app.competitionTitle}</h2>
              <p className="mt-1 text-sm text-muted">
                {app.members.length} kişilik takım
              </p>
            </div>
            <time className="text-xs text-muted">
              {new Date(app.createdAt).toLocaleString("tr-TR")}
            </time>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line text-muted">
                  <th className="py-2 pr-4 font-medium">#</th>
                  <th className="py-2 pr-4 font-medium">İsim Soyisim</th>
                  <th className="py-2 font-medium">Sınıf / Şube</th>
                </tr>
              </thead>
              <tbody>
                {app.members.map((member, index) => (
                  <tr key={member.id} className="border-b border-line/70 last:border-0">
                    <td className="py-2.5 pr-4 text-muted">{index + 1}</td>
                    <td className="py-2.5 pr-4 font-medium text-navy">{member.fullName}</td>
                    <td className="py-2.5 text-navy">{member.classSection}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex gap-4">
            {!app.read && (
              <form action={markCompetitionApplicationRead}>
                <input type="hidden" name="id" value={app.id} />
                <button className="text-sm text-navy underline">Okundu işaretle</button>
              </form>
            )}
            <form action={deleteCompetitionApplication}>
              <input type="hidden" name="id" value={app.id} />
              <button className="text-sm text-crimson underline">Sil</button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
