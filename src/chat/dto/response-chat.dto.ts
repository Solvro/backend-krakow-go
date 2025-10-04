import { ChatType } from "@prisma/client";

import { ApiProperty } from "@nestjs/swagger";

import { ResponseChatMessageDto } from "./response-chat-message.dto";
import { ResponseChatParticipantDto } from "./response-chat-participant.dto";

export class ResponseChatDto {
  @ApiProperty({ description: "Chat identifier" })
  id: string;

  @ApiProperty({ enum: ChatType, description: "Chat type" })
  type: ChatType;

  @ApiProperty({ description: "Related event identifier", nullable: true })
  eventId: string | null;

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

  @ApiProperty({
    type: ResponseChatParticipantDto,
    isArray: true,
    description: "Participants in the chat",
  })
  participants: ResponseChatParticipantDto[];

  @ApiProperty({
    type: ResponseChatMessageDto,
    isArray: true,
    description: "Messages in the chat",
  })
  messages: ResponseChatMessageDto[];
}
