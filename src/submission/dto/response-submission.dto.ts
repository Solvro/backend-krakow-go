import { SubmissionStatus } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ResponseSubmissionDto {
  @ApiProperty({ description: "Submission identifier" })
  id: string;

  @ApiProperty({ description: "Submission status", enum: SubmissionStatus })
  status: SubmissionStatus;

  @ApiPropertyOptional({
    description: "Volunteer motivation note",
    nullable: true,
  })
  description?: string | null;

  @ApiProperty({ description: "Volunteer identifier" })
  volunteerId: string;

  @ApiProperty({ description: "Event identifier" })
  eventId: string;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Creation timestamp",
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Last update timestamp",
  })
  updatedAt: Date;
}
