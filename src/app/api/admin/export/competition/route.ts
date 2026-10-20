import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { buildExcelBuffer, excelResponse } from "@/lib/export-excel";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response("Yetkisiz", { status: 401 });
  }

  const applications = await prisma.competitionApplication.findMany({
    orderBy: { createdAt: "desc" },
    include: { members: { orderBy: { order: "asc" } } },
  });

  const rows = applications.map((app, index) => ({
    Sıra: index + 1,
    "Ad Soyad": app.members[0]?.fullName || "",
    "Sınıf / Şube": app.members[0]?.classSection || "",
    Yarışma: app.competitionTitle,
    Durum: app.read ? "Okundu" : "Yeni",
    "Başvuru Tarihi": new Date(app.createdAt).toLocaleString("tr-TR"),
  }));

  const stamp = new Date().toISOString().slice(0, 10);
  const buffer = buildExcelBuffer(rows, "Yarışma Başvuruları");
  return excelResponse(buffer, `yarisma-basvurulari-${stamp}.xlsx`);
}
