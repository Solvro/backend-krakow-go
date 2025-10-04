import { ApiProperty } from "@nestjs/swagger";

export class ResponseChatParticipantDto {
  @ApiProperty({ description: "Participant identifier" })
  id: string;

  @ApiProperty({ description: "Chat identifier" })
  chatId: string;

  @ApiProperty({ description: "Related volunteer identifier", nullable: true })
  volunteerId: string | null;

  @ApiProperty({
    description: "Related organization identifier",
    nullable: true,
  })
  organizationId: string | null;

  @ApiProperty({
    type: String,
    format: "date-time",
    description: "Timestamp when participant joined",
  })
  createdAt: Date;
}
