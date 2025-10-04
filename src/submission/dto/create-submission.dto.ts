import { SubmissionStatus } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateSubmissionDto {
  @ApiPropertyOptional({
    description: "Submission status",
    enum: SubmissionStatus,
  })
  status?: SubmissionStatus;

  @ApiPropertyOptional({
    description: "Volunteer motivation note",
    example: "Chcę pomóc w sadzeniu drzew, bo kocham miejską zieleń.",
  })
  description?: string;

  @ApiProperty({ description: "Volunteer identifier" })
  volunteerId: string;

  @ApiProperty({ description: "Event identifier" })
  eventId: string;
}
