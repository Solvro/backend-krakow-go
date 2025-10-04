import { ApiProperty } from "@nestjs/swagger";

import { ResponseChatParticipantDto } from "./response-chat-participant.dto";

export class ResponseChatMessageDto {
  @ApiProperty({ description: "Message identifier" })
  id: string;

  @ApiProperty({ description: "Chat identifier" })
  chatId: string;

  @ApiProperty({ description: "Participant identifier of the sender" })
  senderId: string;

  @ApiProperty({ description: "Message body" })
  content: string;

  @ApiProperty({
    type: ResponseChatParticipantDto,
    description: "Sender details",
  })
  sender: ResponseChatParticipantDto;

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
