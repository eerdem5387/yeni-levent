-- CreateTable
CREATE TABLE "TournamentApplication" (
    "id" TEXT NOT NULL,
    "tournamentKey" TEXT NOT NULL DEFAULT 'satranc-mangala',
    "tournamentTitle" TEXT NOT NULL DEFAULT 'Rize Levent Koleji Satranç ve Mangala Turnuvası',
    "fullName" TEXT NOT NULL,
    "classSection" TEXT NOT NULL,
    "chess" BOOLEAN NOT NULL DEFAULT false,
    "mangala" BOOLEAN NOT NULL DEFAULT false,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TournamentApplication_pkey" PRIMARY KEY ("id")
);
