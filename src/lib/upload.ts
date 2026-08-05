import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

const MAX_BYTES = 5 * 1024 * 1024; // 5 MB

export async function saveUploadedImage(file: File, folder: string) {
  if (!file.size) return null;

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    throw new Error("Yalnızca JPG, PNG, WebP veya GIF yüklenebilir.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("Dosya boyutu 5 MB'dan küçük olmalıdır.");
  }

  const dir = path.join(process.cwd(), "public", "uploads", folder);
  await mkdir(dir, { recursive: true });

  const filename = `${randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(dir, filename), buffer);

  return `/uploads/${folder}/${filename}`;
}
