import { ApiProperty } from "@nestjs/swagger";

export class ResponseVolunteerDto {
  @ApiProperty({ description: "Volunteer identifier" })
  id: string;

  @ApiProperty({ description: "Volunteer name" })
  name: string;

  @ApiProperty({ description: "Volunteer email" })
  email: string;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Volunteer birthdate",
  })
  birthdate: Date;

  @ApiProperty({ description: "Related school identifier", nullable: true })
  schoolId: string | null;

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
