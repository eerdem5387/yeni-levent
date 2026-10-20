import { NextResponse } from "next/server";
import { z } from "zod";
import { competitionInfo } from "@/lib/competition";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string().trim().min(2, "İsim soyisim gerekli."),
  classSection: z.string().trim().min(1, "Sınıf ve şube gerekli."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.competitionApplication.create({
      data: {
        competitionKey: competitionInfo.key,
        competitionTitle: competitionInfo.title,
        members: {
          create: [
            {
              fullName: data.fullName,
              classSection: data.classSection,
              order: 0,
            },
          ],
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0]?.message || "Lütfen formu kontrol edin." },
        { status: 400 },
      );
    }
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
