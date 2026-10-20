-- CreateTable
CREATE TABLE "CompetitionApplication" (
    "id" TEXT NOT NULL,
    "competitionKey" TEXT NOT NULL DEFAULT 'lise-bilgi-yarismasi',
    "competitionTitle" TEXT NOT NULL DEFAULT 'Rize Levent Koleji Lise Bilgi Yarışması',
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompetitionApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompetitionMember" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "classSection" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CompetitionMember_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CompetitionMember" ADD CONSTRAINT "CompetitionMember_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "CompetitionApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;
