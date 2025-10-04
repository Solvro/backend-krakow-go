import { SubmissionStatus } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSubmissionDto {
  @ApiPropertyOptional({
    description: "Submission status",
    enum: SubmissionStatus,
  })
  status?: SubmissionStatus;

  @ApiProperty({ description: "Volunteer identifier" })
  volunteerId: string;

  @ApiProperty({ description: "Event identifier" })
  eventId: string;
}
