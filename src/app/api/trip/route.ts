import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import {
  formatClassSection,
  formatPersonName,
  isValidClassSection,
  isValidPersonName,
  isValidPhone,
  normalizePhone,
} from "@/lib/form-guards";
import { tripInfo } from "@/lib/trip";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  fullName: z.string(),
  classSection: z.string(),
  phone: z.string(),
  parentName: z.string(),
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());

    const fullName = formatPersonName(body.fullName);
    const classSection = formatClassSection(body.classSection);
    const phone = normalizePhone(body.phone);
    const parentName = formatPersonName(body.parentName);

    if (!isValidPersonName(fullName)) {
      return NextResponse.json(
        { error: "Ad soyadı en az iki kelime olacak şekilde yazın (yalnızca harf)." },
        { status: 400 },
      );
    }
    if (!isValidClassSection(classSection)) {
      return NextResponse.json(
        { error: "Sınıfı 5-A gibi yazın (5–12 arası sınıf + şube)." },
        { status: 400 },
      );
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Telefon 05xxxxxxxxx formatında 11 haneli olmalıdır." },
        { status: 400 },
      );
    }
    if (!isValidPersonName(parentName)) {
      return NextResponse.json(
        { error: "Veli ad soyadını en az iki kelime olacak şekilde yazın." },
        { status: 400 },
      );
    }

    await prisma.tripApplication.create({
      data: {
        tripKey: tripInfo.key,
        tripTitle: tripInfo.title,
        fullName,
        classSection,
        phone,
        parentName,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/trip]", error);
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
