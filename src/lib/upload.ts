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

/** Local disk write — development only (Vercel filesystem is read-only). */
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

function hasBlobStore() {
  return (
    Boolean(process.env.BLOB_READ_WRITE_TOKEN) ||
    Boolean(process.env.BLOB_STORE_ID)
  );
}

/** Upload to Vercel Blob; falls back to local uploads in development. */
export async function saveImageToBlob(file: File, folder: string) {
  if (!file.size) return null;

  const ext = validateUploadedImage(file);

  if (!hasBlobStore() && process.env.NODE_ENV === "development") {
    return saveUploadedImage(file, folder);
  }

  if (!hasBlobStore()) {
    throw new Error(
      "Blob store bağlı değil. Vercel → Storage → Blob → Connect to Project yapın.",
    );
  }

  const pathname = `${folder}/${randomUUID()}.${ext}`;
  const blob = await put(pathname, file, {
    access: "public",
    addRandomSuffix: false,
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? { token: process.env.BLOB_READ_WRITE_TOKEN }
      : {}),
  });

  return blob.url;
}

export async function saveStaffPhotoToBlob(file: File) {
  return saveImageToBlob(file, "staff");
}

export async function saveEventCoverToBlob(file: File) {
  return saveImageToBlob(file, "events");
}
