import type { SubmissionStatus } from "@prisma/client";

export class SubmissionEntity {
  id: string;
  status: SubmissionStatus;
  volunteerId: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}
