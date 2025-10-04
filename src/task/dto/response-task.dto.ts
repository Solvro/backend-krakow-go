import { ApiProperty } from "@nestjs/swagger";

export class ResponseTaskDto {
  @ApiProperty({ description: "Task identifier" })
  id: string;

  @ApiProperty({ description: "Task title" })
  title: string;

  @ApiProperty({ description: "Task description", nullable: true })
  description: string | null;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Task start date",
  })
  startDate: Date;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Task end date",
  })
  endDate: Date;

  @ApiProperty({ description: "Completion flag" })
  isCompleted: boolean;

  @ApiProperty({ description: "Related event identifier" })
  eventId: string;

  @ApiProperty({ description: "Assigned volunteer identifier", nullable: true })
  volunteerId: string | null;

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
