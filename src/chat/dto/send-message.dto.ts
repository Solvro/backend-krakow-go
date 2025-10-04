import { ApiProperty } from "@nestjs/swagger";

export enum ChatSenderType {
  ORGANIZATION = "ORGANIZATION",
  VOLUNTEER = "VOLUNTEER",
}

export class SendMessageDto {
  @ApiProperty({
    enum: ChatSenderType,
    enumName: "ChatSenderType",
    description: "Type of the sender",
  })
  senderType: ChatSenderType;

  @ApiProperty({ description: "Identifier of the sender" })
  senderId: string;

  @ApiProperty({ description: "Message body" })
  content: string;
}
