import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { put } from "@vercel/blob";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export function validateUploadedImage(file: File) {
  if (!file.size) {
    throw new Error("Dosya seçilmedi.");
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new Error("Yalnızca JPG, PNG, WebP veya GIF yüklenebilir.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Dosya boyutu 5 MB'dan küçük olmalıdır.");
  }

  return ext;
}

export async function saveUploadedImage(file: File, folder: string) {
  if (!file.size) return null;

  const ext = validateUploadedImage(file);

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });

  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}

export async function saveStaffPhotoToBlob(file: File) {
  if (!file.size) return null;

  const ext = validateUploadedImage(file);
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    if (process.env.NODE_ENV === "development") {
      return saveUploadedImage(file, "staff");
    }
    throw new Error(
      "BLOB_READ_WRITE_TOKEN tanımlı değil. Vercel Blob store bağlayın veya .env dosyasına token ekleyin.",
    );
  }

  const pathname = `staff/${randomUUID()}.${ext}`;
  const blob = await put(pathname, file, {
    access: "public",
    token,
    addRandomSuffix: false,
  });

  return blob.url;
}
