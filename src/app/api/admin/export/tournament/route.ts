import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { buildExcelBuffer, excelResponse } from "@/lib/export-excel";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Yetkisiz", { status: 401 });
  }

  const applications = await prisma.tournamentApplication.findMany({
    orderBy: { createdAt: "desc" },
  });

  const rows = applications.map((app, index) => ({
    Sıra: index + 1,
    "Ad Soyad": app.fullName,
    "Sınıf / Şube": app.classSection,
    Satranç: app.chess ? "Evet" : "Hayır",
    Mangala: app.mangala ? "Evet" : "Hayır",
    Turnuva: app.tournamentTitle,
    "Başvuru Tarihi": new Date(app.createdAt).toLocaleString("tr-TR"),
  }));

  const stamp = new Date().toISOString().slice(0, 10);
  const buffer = buildExcelBuffer(rows, "Turnuva Başvuruları");
  return excelResponse(buffer, `turnuva-basvurulari-${stamp}.xlsx`);
}
