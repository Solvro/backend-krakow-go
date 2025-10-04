import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class CreateOrganizationDto {
  @ApiProperty({ description: "Organization name" })
  name: string;

  @ApiPropertyOptional({
    description: "Organization description",
    nullable: true,
  })
  description?: string | null;
}
