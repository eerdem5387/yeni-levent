-- CreateTable
CREATE TABLE "TripApplication" (
    "id" TEXT NOT NULL,
    "tripKey" TEXT NOT NULL DEFAULT 'tiflis-gezisi',
    "tripTitle" TEXT NOT NULL DEFAULT 'Rize Levent Koleji Tiflis Gezisi',
    "fullName" TEXT NOT NULL,
    "classSection" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "parentName" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TripApplication_pkey" PRIMARY KEY ("id")
);
