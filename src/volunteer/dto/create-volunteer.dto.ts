import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateVolunteerDto {
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

  @ApiPropertyOptional({
    description: "Related school identifier",
    nullable: true,
  })
  schoolId?: string | null;
}
