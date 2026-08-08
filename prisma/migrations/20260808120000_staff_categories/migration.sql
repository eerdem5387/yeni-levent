-- CreateTable
CREATE TABLE "StaffCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "StaffCategory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StaffCategory_slug_key" ON "StaffCategory"("slug");

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN "categoryId" TEXT;

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "StaffCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Seed default categories (leventokullari.com structure)
INSERT INTO "StaffCategory" ("id", "name", "slug", "order") VALUES
  ('scat_rehberlik', 'Rehberlik Uzmanları', 'rehberlik-uzmanlari', 1),
  ('scat_matematik', 'Matematik', 'matematik', 2),
  ('scat_fen', 'Fen Bilimleri', 'fen-bilimleri', 3),
  ('scat_turkce', 'Türkçe - Türk Dili ve Edebiyatı', 'turkce-turk-dili-ve-edebiyati', 4),
  ('scat_sosyal', 'Sosyal Bilimler', 'sosyal-bilimler', 5),
  ('scat_yabanci', 'Yabancı Diller', 'yabanci-diller', 6),
  ('scat_kultur', 'Kültür Branşları', 'kultur-branslari', 7)
ON CONFLICT ("slug") DO NOTHING;
