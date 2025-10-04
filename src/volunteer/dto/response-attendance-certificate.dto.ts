import { ApiProperty } from "@nestjs/swagger";

export class ResponseAttendanceCertificateDto {
  @ApiProperty({ description: "Certificate identifier" })
  id: string;

  @ApiProperty({ description: "Associated event identifier" })
  eventId: string;

  @ApiProperty({ description: "Volunteer identifier" })
  volunteerId: string;

  @ApiProperty({ description: "Number of tasks completed for the event" })
  tasksCount: number;

  @ApiProperty({ description: "Points awarded with this certificate" })
  points: number;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Certificate issue timestamp",
  })
  issuedAt: Date;
}
