import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveImageToBlob } from "@/lib/upload";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const folder = searchParams.get("folder") || "staff";
  const q = (searchParams.get("q") || "").trim().toLocaleLowerCase("tr-TR");

  const assets = await prisma.mediaAsset.findMany({
    where: {
      folder,
      ...(q
        ? {
            OR: [
              { filename: { contains: q, mode: "insensitive" } },
              { alt: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ items: assets });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const photo = formData.get("photo");
    const folder = String(formData.get("folder") || "staff");
    const alt = String(formData.get("alt") || "").trim();

    if (!(photo instanceof File) || photo.size === 0) {
      return NextResponse.json({ error: "Dosya seçilmedi." }, { status: 400 });
    }

    const url = await saveImageToBlob(photo, `${folder}/library`);
    if (!url) {
      return NextResponse.json({ error: "Dosya yüklenemedi." }, { status: 400 });
    }

    const pathname = new URL(url).pathname.replace(/^\//, "");
    const filename = pathname.split("/").pop() || photo.name;

    const asset = await prisma.mediaAsset.upsert({
      where: { pathname },
      create: {
        url,
        pathname,
        filename,
        folder,
        alt: alt || filename,
      },
      update: {
        url,
        filename,
        alt: alt || filename,
      },
    });

    return NextResponse.json({ item: asset, url: asset.url });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Dosya yüklenirken bir hata oluştu.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Yetkisiz erişim." }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id gerekli." }, { status: 400 });
  }

  await prisma.mediaAsset.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
