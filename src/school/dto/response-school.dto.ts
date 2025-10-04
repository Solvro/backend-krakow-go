import { ApiProperty } from "@nestjs/swagger";

export class ResponseSchoolDto {
  @ApiProperty({ description: "School identifier" })
  id: string;

  @ApiProperty({ description: "School name" })
  name: string;

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
