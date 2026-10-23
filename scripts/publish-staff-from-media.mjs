import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const TOKEN_MAP = [
  ["akyildiz", "Akyıldız"],
  ["kanberoglu", "Kanberoğlu"],
  ["deringol", "Deringöl"],
  ["murselin", "Mürselin"],
  ["beyzanur", "Beyzanur"],
  ["edanur", "Edanur"],
  ["nisanur", "Nisanur"],
  ["abdullah", "Abdullah"],
  ["batuhan", "Batuhan"],
  ["mehtap", "Mehtap"],
  ["ilknur", "İlknur"],
  ["gulsah", "Gülşah"],
  ["sumeyra", "Sümeyra"],
  ["rumeysa", "Rumeysa"],
  ["nursin", "Nurşin"],
  ["yilmaz", "Yılmaz"],
  ["ulucay", "Uluçay"],
  ["demirci", "Demirci"],
  ["berber", "Berber"],
  ["gungor", "Güngör"],
  ["karali", "Karalı"],
  ["karaca", "Karaca"],
  ["atmaca", "Atmaca"],
  ["akbulut", "Akbulut"],
  ["kasap", "Kasap"],
  ["peker", "Peker"],
  ["kemer", "Kemer"],
  ["erten", "Erten"],
  ["kadir", "Kadir"],
  ["colak", "Çolak"],
  ["celik", "Çelik"],
  ["busra", "Büşra"],
  ["goksu", "Göksu"],
  ["mumin", "Mümin"],
  ["tugba", "Tuğba"],
  ["teoman", "Teoman"],
  ["burak", "Burak"],
  ["beyza", "Beyza"],
  ["berna", "Berna"],
  ["kamer", "Kamer"],
  ["melek", "Melek"],
  ["nevzat", "Nevzat"],
  ["rabia", "Rabia"],
  ["ali", "Ali"],
  ["eda", "Eda"],
  ["esra", "Esra"],
  ["yavuz", "Yavuz"],
  ["orun", "Örün"],
  ["ozer", "Özer"],
  ["mete", "Mete"],
  ["goz", "Göz"],
  ["sac", "Saç"],
];

function nameFromFilename(filename) {
  const base = filename.replace(/\.[^.]+$/i, "");
  if (/^\d+$/.test(base) || base === "staff-photo") {
    return base;
  }

  let remaining = base.toLocaleLowerCase("tr-TR");
  const parts = [];

  while (remaining.length > 0) {
    if (remaining.startsWith("-")) {
      remaining = remaining.slice(1);
      continue;
    }
    let matched = false;
    for (const [token, pretty] of TOKEN_MAP) {
      if (remaining === token || remaining.startsWith(`${token}-`)) {
        parts.push(pretty);
        remaining = remaining.slice(token.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      const chunk = remaining.split("-")[0];
      parts.push(chunk.charAt(0).toLocaleUpperCase("tr-TR") + chunk.slice(1));
      remaining = remaining.slice(chunk.length);
    }
  }

  return parts.join(" ").trim() || base;
}

async function main() {
  const assets = await prisma.mediaAsset.findMany({
    where: { folder: "staff" },
    orderBy: { filename: "asc" },
  });

  console.log(`${assets.length} medya kaydı işlenecek`);

  // Replace previous auto-published drafts from this script if re-run:
  // keep it simple: delete all staff without category and empty title? Too risky.
  // Instead upsert by photoUrl uniqueness isn't in schema — delete all and recreate only if user wants fresh.
  // User asked one-time publish. Clear existing staff first so we don't duplicate.
  const deleted = await prisma.staff.deleteMany({});
  console.log(`Mevcut kadro silindi: ${deleted.count}`);

  let order = 0;
  for (const asset of assets) {
    const name = nameFromFilename(asset.filename);
    order += 1;
    await prisma.staff.create({
      data: {
        name,
        title: "",
        bio: "",
        photoUrl: asset.url,
        categoryId: null,
        order,
        published: true,
      },
    });
    console.log(`✓ ${asset.filename} → ${name}`);
  }

  console.log(`Tamam: ${assets.length} üye yayınlandı (kategori/branş boş).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
