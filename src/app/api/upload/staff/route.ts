import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { saveUploadedImage } from "@/lib/upload";

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

    const url = await saveUploadedImage(photo, "staff");
    if (!url) {
      return NextResponse.json({ error: "Dosya yüklenemedi." }, { status: 400 });
    }

    return NextResponse.json({ url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Dosya yüklenirken bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
