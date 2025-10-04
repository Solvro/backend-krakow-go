import { EventTopic } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

export class ResponseEventDto {
  @ApiProperty({ description: "Event identifier" })
  id: string;

  @ApiProperty({ description: "Event title" })
  title: string;

  @ApiProperty({ description: "Event topic", enum: EventTopic })
  topic: EventTopic;

  @ApiProperty({ description: "Event description", nullable: true })
  description: string | null;

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

  @ApiProperty({ description: "Chat identifier", nullable: true })
  chatId: string | null;

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
