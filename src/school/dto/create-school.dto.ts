import { ApiProperty } from "@nestjs/swagger";

export class CreateSchoolDto {
  @ApiProperty({ description: "School name" })
  name: string;
}
