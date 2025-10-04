-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "points" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "AttendanceCertificate" (
    "id" TEXT NOT NULL,
    "issuedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tasksCount" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "AttendanceCertificate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AttendanceCertificate_volunteerId_eventId_key" ON "AttendanceCertificate"("volunteerId", "eventId");

-- AddForeignKey
ALTER TABLE "AttendanceCertificate" ADD CONSTRAINT "AttendanceCertificate_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttendanceCertificate" ADD CONSTRAINT "AttendanceCertificate_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
