import { ApiProperty } from "@nestjs/swagger";

export class ResponseCoordinatorDto {
  @ApiProperty({ description: "Coordinator identifier" })
  id: string;

  @ApiProperty({ description: "Coordinator name" })
  name: string;

  @ApiProperty({ description: "Coordinator email" })
  email: string;

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
