import type { SubmissionStatus } from "@prisma/client";

export class CreateSubmissionDto {
  status?: SubmissionStatus;
  volunteerId: string;
  eventId: string;
}
