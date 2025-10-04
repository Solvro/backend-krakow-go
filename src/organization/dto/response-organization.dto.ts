import { ApiProperty } from "@nestjs/swagger";

export class ResponseOrganizationDto {
  @ApiProperty({ description: "Organization identifier" })
  id: string;

  @ApiProperty({ description: "Organization name" })
  name: string;

  @ApiProperty({ description: "Organization description", nullable: true })
  description: string | null;

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
