import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  formatClassSection,
  formatPersonName,
  isValidClassSection,
  isValidPersonName,
} from "@/lib/form-guards";
import { tournamentInfo } from "@/lib/tournament";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string(),
  classSection: z.string(),
  chess: z.boolean(),
  mangala: z.boolean(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());

    const fullName = formatPersonName(body.fullName);
    const classSection = formatClassSection(body.classSection);
    const chess = Boolean(body.chess);
    const mangala = Boolean(body.mangala);

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
    if (!chess && !mangala) {
      return NextResponse.json(
        { error: "En az bir turnuva seçmelisiniz (Satranç ve/veya Mangala)." },
        { status: 400 },
      );
    }

    await prisma.tournamentApplication.create({
      data: {
        tournamentKey: tournamentInfo.key,
        tournamentTitle: tournamentInfo.title,
        fullName,
        classSection,
        chess,
        mangala,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/tournament]", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Lütfen formu kontrol edin." }, { status: 400 });
    }
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: "Kayıt sırasında veritabanı hatası oluştu. Lütfen tekrar deneyin." },
        { status: 500 },
      );
    }
    return NextResponse.json({ error: "Sunucu hatası." }, { status: 500 });
  }
}
