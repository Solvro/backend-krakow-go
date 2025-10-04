import { ChatType } from "@prisma/client";
import type { Chat, ChatMessage, ChatParticipant } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreatePrivateChatDto } from "./dto/create-private-chat.dto";
import { ResponseChatMessageDto } from "./dto/response-chat-message.dto";
import { ResponseChatParticipantDto } from "./dto/response-chat-participant.dto";
import { ResponseChatDto } from "./dto/response-chat.dto";
import { ChatSenderType, SendMessageDto } from "./dto/send-message.dto";

type ChatWithRelations = Chat & {
  event: { id: string; organizationId: string } | null;
  participants: ChatParticipant[];
  messages: (ChatMessage & { sender: ChatParticipant })[];
};

@Injectable()
export class ChatService {
  private readonly chatInclude = {
    event: { select: { id: true, organizationId: true } },
    participants: true,
    messages: {
      include: { sender: true },
      orderBy: { createdAt: "asc" as const },
    },
  } as const;

  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateEventChat(eventId: string): Promise<ResponseChatDto> {
    const chat = await this.ensureEventChat(eventId);
    return this.toChatDto(chat);
  }

  async getChatById(chatId: string): Promise<ResponseChatDto> {
    const chat = await this.getChatEntity(chatId);
    return this.toChatDto(chat);
  }

  async getOrCreatePrivateChat(
    dto: CreatePrivateChatDto,
  ): Promise<ResponseChatDto> {
    const [organization, volunteer] = await Promise.all([
      this.prisma.organization.findUnique({
        where: { id: dto.organizationId },
      }),
      this.prisma.volunteer.findUnique({
        where: { id: dto.volunteerId },
      }),
    ]);

    if (organization === null) {
      throw new NotFoundException(
        `Organization with id ${dto.organizationId} not found`,
      );
    }
    if (volunteer === null) {
      throw new NotFoundException(
        `Volunteer with id ${dto.volunteerId} not found`,
      );
    }

    const existingChat = (await this.prisma.chat.findFirst({
      where: {
        type: ChatType.PRIVATE,
        participants: {
          some: { organizationId: dto.organizationId },
        },
        AND: [
          {
            participants: {
              some: { volunteerId: dto.volunteerId },
            },
          },
        ],
      },
      include: this.chatInclude,
    })) as ChatWithRelations | null;

    if (existingChat !== null) {
      return this.toChatDto(existingChat);
    }

    const chat = (await this.prisma.chat.create({
      data: {
        type: ChatType.PRIVATE,
        participants: {
          create: [
            {
              organization: { connect: { id: dto.organizationId } },
            },
            {
              volunteer: { connect: { id: dto.volunteerId } },
            },
          ],
        },
      },
      include: this.chatInclude,
    })) as ChatWithRelations;

    return this.toChatDto(chat);
  }

  async listChatsForOrganization(
    organizationId: string,
  ): Promise<ResponseChatDto[]> {
    const chats = (await this.prisma.chat.findMany({
      where: {
        participants: {
          some: { organizationId },
        },
      },
      include: this.chatInclude,
      orderBy: { updatedAt: "desc" as const },
    })) as ChatWithRelations[];

    return chats.map((chat) => this.toChatDto(chat));
  }

  async listChatsForVolunteer(volunteerId: string): Promise<ResponseChatDto[]> {
    const chats = (await this.prisma.chat.findMany({
      where: {
        participants: {
          some: { volunteerId },
        },
      },
      include: this.chatInclude,
      orderBy: { updatedAt: "desc" as const },
    })) as ChatWithRelations[];

    return chats.map((chat) => this.toChatDto(chat));
  }

  async sendMessageToChat(
    chatId: string,
    dto: SendMessageDto,
  ): Promise<ResponseChatMessageDto> {
    const chat = await this.getChatEntity(chatId);
    return this.createMessage(chat, dto);
  }

  async sendMessageToEvent(
    eventId: string,
    dto: SendMessageDto,
  ): Promise<ResponseChatMessageDto> {
    const chat = await this.ensureEventChat(eventId);
    return this.createMessage(chat, dto);
  }

  private async ensureEventChat(eventId: string): Promise<ChatWithRelations> {
    const event = await this.prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, organizationId: true },
    });

    if (event === null) {
      throw new NotFoundException(`Event with id ${eventId} not found`);
    }

    const existingChat = (await this.prisma.chat.findUnique({
      where: { eventId },
      include: this.chatInclude,
    })) as ChatWithRelations | null;

    if (existingChat !== null) {
      return existingChat;
    }

    const createdChat = (await this.prisma.chat.create({
      data: {
        type: ChatType.EVENT,
        event: { connect: { id: eventId } },
        participants: {
          create: {
            organization: { connect: { id: event.organizationId } },
          },
        },
      },
      include: this.chatInclude,
    })) as ChatWithRelations;

    return createdChat;
  }

  private async getChatEntity(chatId: string): Promise<ChatWithRelations> {
    const chat = (await this.prisma.chat.findUnique({
      where: { id: chatId },
      include: this.chatInclude,
    })) as ChatWithRelations | null;

    if (chat === null) {
      throw new NotFoundException(`Chat with id ${chatId} not found`);
    }

    return chat;
  }

  private async createMessage(
    chat: ChatWithRelations,
    dto: SendMessageDto,
  ): Promise<ResponseChatMessageDto> {
    const trimmedContent = dto.content.trim();
    if (trimmedContent.length === 0) {
      throw new BadRequestException("Message content cannot be empty");
    }

    const participant = await this.resolveSenderParticipant(
      chat,
      dto.senderType,
      dto.senderId,
    );

    const message = await this.prisma.chatMessage.create({
      data: {
        chatId: chat.id,
        senderId: participant.id,
        content: trimmedContent,
      },
      include: { sender: true },
    });

    return this.toMessageDto(message);
  }

  private async resolveSenderParticipant(
    chat: ChatWithRelations,
    senderType: ChatSenderType,
    senderId: string,
  ): Promise<ChatParticipant> {
    const participant = chat.participants.find((item) => {
      if (senderType === ChatSenderType.ORGANIZATION) {
        return item.organizationId === senderId;
      }
      return item.volunteerId === senderId;
    });

    if (participant !== undefined) {
      return participant;
    }

    if (chat.type === ChatType.EVENT) {
      if (chat.event === null) {
        throw new BadRequestException(
          "Event chat is missing related event information",
        );
      }

      if (senderType === ChatSenderType.ORGANIZATION) {
        if (chat.event.organizationId !== senderId) {
          throw new BadRequestException(
            "Organization is not assigned to this event chat",
          );
        }

        const created = await this.prisma.chatParticipant.create({
          data: {
            chatId: chat.id,
            organizationId: senderId,
          },
        });
        chat.participants.push(created);
        return created;
      }

      const volunteer = await this.prisma.volunteer.findUnique({
        where: { id: senderId },
        select: { id: true },
      });

      if (volunteer === null) {
        throw new NotFoundException(`Volunteer with id ${senderId} not found`);
      }

      const created = await this.prisma.chatParticipant.create({
        data: {
          chatId: chat.id,
          volunteerId: senderId,
        },
      });
      chat.participants.push(created);
      return created;
    }

    throw new BadRequestException("Sender is not a participant of this chat");
  }

  private toChatDto(chat: ChatWithRelations): ResponseChatDto {
    return {
      id: chat.id,
      type: chat.type,
      eventId: chat.eventId,
      createdAt: chat.createdAt,
      updatedAt: chat.updatedAt,
      participants: chat.participants.map((participant) =>
        this.toParticipantDto(participant),
      ),
      messages: chat.messages.map((message) => this.toMessageDto(message)),
    };
  }

  private toParticipantDto(
    participant: ChatParticipant,
  ): ResponseChatParticipantDto {
    return {
      id: participant.id,
      chatId: participant.chatId,
      volunteerId: participant.volunteerId ?? null,
      organizationId: participant.organizationId ?? null,
      createdAt: participant.createdAt,
    };
  }

  private toMessageDto(
    message: ChatMessage & { sender: ChatParticipant },
  ): ResponseChatMessageDto {
    return {
      id: message.id,
      chatId: message.chatId,
      senderId: message.senderId,
      content: message.content,
      createdAt: message.createdAt,
      updatedAt: message.updatedAt,
      sender: this.toParticipantDto(message.sender),
    };
  }
}
