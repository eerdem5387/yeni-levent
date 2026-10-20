import { NextResponse } from "next/server";
import { z } from "zod";
import {
  formatClassSection,
  formatPersonName,
  isValidClassSection,
  isValidPersonName,
} from "@/lib/form-guards";
import { competitionInfo } from "@/lib/competition";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string(),
  classSection: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());

    const fullName = formatPersonName(body.fullName);
    const classSection = formatClassSection(body.classSection);

    if (!isValidPersonName(fullName)) {
      return NextResponse.json(
        { error: "İsim soyisim en az iki kelime olacak şekilde yazın (yalnızca harf)." },
        { status: 400 },
      );
    }
    if (!isValidClassSection(classSection)) {
      return NextResponse.json(
        { error: "Sınıfı 5-A gibi yazın (5–12 arası sınıf + şube)." },
        { status: 400 },
      );
    }

    await prisma.competitionApplication.create({
      data: {
        competitionKey: competitionInfo.key,
        competitionTitle: competitionInfo.title,
        members: {
          create: [
            {
              fullName,
              classSection,
              order: 0,
            },
          ],
        },
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Lütfen formu kontrol edin." }, { status: 400 });
    }
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
