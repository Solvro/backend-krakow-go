import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { ChatService } from "./chat.service";
import { CreatePrivateChatDto } from "./dto/create-private-chat.dto";
import { ResponseChatMessageDto } from "./dto/response-chat-message.dto";
import { ResponseChatDto } from "./dto/response-chat.dto";
import { SendMessageDto } from "./dto/send-message.dto";

@ApiTags("Chat")
@Controller("chat")
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get("event/:eventId")
  @ApiOperation({ summary: "Get or create event chat" })
  @ApiOkResponse({ type: ResponseChatDto })
  async getEventChat(
    @Param("eventId") eventId: string,
  ): Promise<ResponseChatDto> {
    return this.chatService.getOrCreateEventChat(eventId);
  }

  @Get(":chatId")
  @ApiOperation({ summary: "Get chat by id" })
  @ApiOkResponse({ type: ResponseChatDto })
  async getChat(@Param("chatId") chatId: string): Promise<ResponseChatDto> {
    return this.chatService.getChatById(chatId);
  }

  @Post("private")
  @ApiOperation({ summary: "Create or reuse private chat" })
  @ApiCreatedResponse({ type: ResponseChatDto })
  async createPrivateChat(
    @Body() dto: CreatePrivateChatDto,
  ): Promise<ResponseChatDto> {
    return this.chatService.getOrCreatePrivateChat(dto);
  }

  @Get("organization/:organizationId")
  @ApiOperation({ summary: "List chats for organization" })
  @ApiOkResponse({ type: ResponseChatDto, isArray: true })
  async listForOrganization(
    @Param("organizationId") organizationId: string,
  ): Promise<ResponseChatDto[]> {
    return this.chatService.listChatsForOrganization(organizationId);
  }

  @Get("volunteer/:volunteerId")
  @ApiOperation({ summary: "List chats for volunteer" })
  @ApiOkResponse({ type: ResponseChatDto, isArray: true })
  async listForVolunteer(
    @Param("volunteerId") volunteerId: string,
  ): Promise<ResponseChatDto[]> {
    return this.chatService.listChatsForVolunteer(volunteerId);
  }

  @Post(":chatId/messages")
  @ApiOperation({ summary: "Send message to chat" })
  @ApiCreatedResponse({ type: ResponseChatMessageDto })
  async sendMessageToChat(
    @Param("chatId") chatId: string,
    @Body() dto: SendMessageDto,
  ): Promise<ResponseChatMessageDto> {
    return this.chatService.sendMessageToChat(chatId, dto);
  }

  @Post("event/:eventId/messages")
  @ApiOperation({ summary: "Send message to event chat" })
  @ApiCreatedResponse({ type: ResponseChatMessageDto })
  async sendMessageToEvent(
    @Param("eventId") eventId: string,
    @Body() dto: SendMessageDto,
  ): Promise<ResponseChatMessageDto> {
    return this.chatService.sendMessageToEvent(eventId, dto);
  }
}
