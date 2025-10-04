import { EventTopic } from "@prisma/client";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateEventDto {
  @ApiProperty({ description: "Event title" })
  title: string;

  @ApiProperty({ description: "Event topic", enum: EventTopic })
  topic: EventTopic;

  @ApiPropertyOptional({ description: "Event description", nullable: true })
  description?: string | null;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Event start date",
  })
  startDate: Date;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Event end date",
  })
  endDate: Date;

  @ApiProperty({ description: "Event longitude" })
  longitude: number;

  @ApiProperty({ description: "Event latitude" })
  latitude: number;

  @ApiProperty({ description: "Event place name" })
  placeName: string;

  @ApiProperty({ description: "Related organization identifier" })
  organizationId: string;
}
