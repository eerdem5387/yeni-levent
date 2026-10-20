import { NextResponse } from "next/server";
import { z } from "zod";
import { tripInfo } from "@/lib/trip";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string().trim().min(2, "Ad soyad gerekli."),
  classSection: z.string().trim().min(1, "Sınıf gerekli."),
  phone: z.string().trim().min(10, "Geçerli bir telefon numarası girin."),
  parentName: z.string().trim().min(2, "Veli ad soyad gerekli."),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.tripApplication.create({
      data: {
        tripKey: tripInfo.key,
        tripTitle: tripInfo.title,
        fullName: data.fullName,
        classSection: data.classSection,
        phone: data.phone,
        parentName: data.parentName,
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
