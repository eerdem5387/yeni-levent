import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(5),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    await prisma.contactMessage.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || "",
        subject: data.subject || "",
        message: data.message,
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
