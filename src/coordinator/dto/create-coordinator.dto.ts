import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateCoordinatorDto {
  @ApiProperty({ description: "Coordinator name" })
  name: string;

  @ApiProperty({ description: "Coordinator email" })
  email: string;

  @ApiPropertyOptional({
    description: "Related school identifier",
    nullable: true,
  })
  schoolId?: string | null;
}
