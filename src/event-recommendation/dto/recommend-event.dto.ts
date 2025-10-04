import {
  ArrayNotEmpty,
  ArrayUnique,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class RecommendEventDto {
  @ApiProperty({ description: "Recommended event identifier", format: "uuid" })
  @IsUUID()
  eventId: string;

  @ApiProperty({
    description: "List of volunteers to receive recommendation",
    type: String,
    format: "uuid",
    isArray: true,
  })
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID("4", { each: true })
  volunteerIds: string[];

  @ApiPropertyOptional({
    description: "Additional message from coordinator",
    nullable: true,
    maxLength: 500,
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  message?: string;
}
