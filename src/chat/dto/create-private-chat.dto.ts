import { ApiProperty } from "@nestjs/swagger";

export class CreatePrivateChatDto {
  @ApiProperty({ description: "Organization identifier" })
  organizationId: string;

  @ApiProperty({ description: "Volunteer identifier" })
  volunteerId: string;
}
