import type { SubmissionStatus } from "@prisma/client";

export class ResponseSubmissionDto {
  id: string;
  status: SubmissionStatus;
  volunteerId: string;
  eventId: string;
  createdAt: Date;
  updatedAt: Date;
}
