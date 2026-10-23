import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";
import { PrismaClient } from "@prisma/client";

const SOURCE_DIR = process.argv[2] || "/Users/emreerdem/Downloads/fotolar";
const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  console.error("BLOB_READ_WRITE_TOKEN eksik");
  process.exit(1);
}

const prisma = new PrismaClient();

function slugifyFilename(name) {
  const ext = path.extname(name).toLowerCase() || ".png";
  const base = path
    .basename(name, path.extname(name))
    .toLocaleLowerCase("tr-TR")
    .replace(/[^a-z0-9çğıöşü]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
  return `${base || "staff-photo"}${ext}`;
}

function titleFromFilename(name) {
  return path
    .basename(name, path.extname(name))
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

async function main() {
  const files = (await readdir(SOURCE_DIR))
    .filter((name) => /\.(png|jpe?g|webp|gif)$/i.test(name))
    .sort((a, b) => a.localeCompare(b, "tr"));

  console.log(`${files.length} dosya yüklenecek → ${SOURCE_DIR}`);

  for (const originalName of files) {
    const safeName = slugifyFilename(originalName);
    const pathname = `staff/library/${safeName}`;
    const buffer = await readFile(path.join(SOURCE_DIR, originalName));
    const contentType = safeName.endsWith(".png")
      ? "image/png"
      : safeName.endsWith(".webp")
        ? "image/webp"
        : safeName.endsWith(".gif")
          ? "image/gif"
          : "image/jpeg";

    const blob = await put(pathname, buffer, {
      access: "public",
      addRandomSuffix: false,
      contentType,
      token,
      allowOverwrite: true,
    });

    await prisma.mediaAsset.upsert({
      where: { pathname },
      create: {
        url: blob.url,
        pathname,
        filename: safeName,
        folder: "staff",
        alt: titleFromFilename(originalName),
      },
      update: {
        url: blob.url,
        filename: safeName,
        alt: titleFromFilename(originalName),
      },
    });

    console.log(`✓ ${originalName} → ${blob.url}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
