import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveImageToBlob } from "@/lib/upload";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const photo = formData.get("photo");

    if (!(photo instanceof File) || photo.size === 0) {
      return NextResponse.json({ error: "Dosya seçilmedi." }, { status: 400 });
    }

    const url = await saveImageToBlob(photo, "staff/library");
    if (!url) {
      return NextResponse.json({ error: "Dosya yüklenemedi." }, { status: 400 });
    }

    const pathname = new URL(url).pathname.replace(/^\//, "");
    const filename = pathname.split("/").pop() || photo.name;

    await prisma.mediaAsset.upsert({
      where: { pathname },
      create: {
        url,
        pathname,
        filename,
        folder: "staff",
        alt: filename,
      },
      update: { url, filename },
    });

    return NextResponse.json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Dosya yüklenirken bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
