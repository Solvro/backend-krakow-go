import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty({ description: "Task title" })
  title: string;

  @ApiPropertyOptional({ description: "Task description", nullable: true })
  description?: string | null;

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

  @ApiPropertyOptional({ description: "Task completion flag", default: false })
  isCompleted?: boolean;

  @ApiProperty({ description: "Related event identifier" })
  eventId: string;

  @ApiPropertyOptional({
    description: "Assigned volunteer identifier",
    nullable: true,
  })
  volunteerId?: string | null;
}
