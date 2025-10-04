-- CreateTable
CREATE TABLE "EventRecommendation" (
    "id" TEXT NOT NULL,
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "coordinatorId" TEXT NOT NULL,
    "volunteerId" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,

    CONSTRAINT "EventRecommendation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventRecommendation_coordinatorId_volunteerId_eventId_key" ON "EventRecommendation"("coordinatorId", "volunteerId", "eventId");

-- AddForeignKey
ALTER TABLE "EventRecommendation" ADD CONSTRAINT "EventRecommendation_coordinatorId_fkey" FOREIGN KEY ("coordinatorId") REFERENCES "Coordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRecommendation" ADD CONSTRAINT "EventRecommendation_volunteerId_fkey" FOREIGN KEY ("volunteerId") REFERENCES "Volunteer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRecommendation" ADD CONSTRAINT "EventRecommendation_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
