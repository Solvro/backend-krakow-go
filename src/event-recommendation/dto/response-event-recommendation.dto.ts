import { ResponseEventDto } from "src/event/dto/response-event.dto";

import { ApiProperty } from "@nestjs/swagger";

export class ResponseEventRecommendationDto {
  @ApiProperty({ description: "Event recommendation identifier" })
  id: string;

  @ApiProperty({
    description: "Coordinator comment for volunteer",
    nullable: true,
  })
  message: string | null;

  @ApiProperty({ description: "Coordinator identifier" })
  coordinatorId: string;

  @ApiProperty({ description: "Volunteer identifier" })
  volunteerId: string;

  @ApiProperty({ description: "Recommended event identifier" })
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

  @ApiProperty({
    type: () => ResponseEventDto,
    description: "Recommended event details",
  })
  event: ResponseEventDto;
}
