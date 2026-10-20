import { prisma } from "@/lib/prisma";
import { deleteTripApplication, markTripApplicationRead } from "../actions";

export default async function AdminTripApplicationsPage() {
  const applications = await prisma.tripApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-display)] text-3xl text-navy">
          Gezi Başvuruları
        </h1>
        <p className="mt-2 text-sm text-muted">
          Tiflis Gezisi başvuruları · {applications.length} başvuru
        </p>
      </div>

      {applications.length === 0 && (
        <p className="text-muted">Henüz gezi başvurusu yok.</p>
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
              <h2 className="font-semibold text-navy">{app.fullName}</h2>
              <p className="mt-1 text-sm text-muted">
                Sınıf: <span className="font-medium text-navy">{app.classSection}</span>
              </p>
              <p className="mt-1 text-sm text-muted">
                Telefon:{" "}
                <a href={`tel:${app.phone.replace(/\s/g, "")}`} className="font-medium text-navy underline">
                  {app.phone}
                </a>
              </p>
              <p className="mt-1 text-sm text-muted">
                Veli: <span className="font-medium text-navy">{app.parentName}</span>
              </p>
              <p className="mt-2 text-xs text-muted">{app.tripTitle}</p>
            </div>
            <time className="text-xs text-muted">
              {new Date(app.createdAt).toLocaleString("tr-TR")}
            </time>
          </div>

          <div className="mt-4 flex gap-4">
            {!app.read && (
              <form action={markTripApplicationRead}>
                <input type="hidden" name="id" value={app.id} />
                <button className="text-sm text-navy underline">Okundu işaretle</button>
              </form>
            )}
            <form action={deleteTripApplication}>
              <input type="hidden" name="id" value={app.id} />
              <button className="text-sm text-crimson underline">Sil</button>
            </form>
          </div>
        </article>
      ))}
    </div>
  );
}
