import type { Event } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateEventDto } from "./dto/create-event.dto";
import { ResponseEventDto } from "./dto/response-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

type EventWithChat = Event & { chat: { id: string } | null };

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto): Promise<ResponseEventDto> {
    const event = await this.prisma.event.create({
      data: createEventDto,
      include: { chat: { select: { id: true } } },
    });
    return this.toResponse(event);
  }

  async findAll(): Promise<ResponseEventDto[]> {
    const events = await this.prisma.event.findMany({
      include: { chat: { select: { id: true } } },
    });
    return events.map((event) => this.toResponse(event));
  }

  async findOne(id: string): Promise<ResponseEventDto | null> {
    const event = await this.prisma.event.findUnique({
      where: { id },
      include: { chat: { select: { id: true } } },
    });
    if (event === null) {
      return null;
    }
    return this.toResponse(event);
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<ResponseEventDto> {
    const event = await this.prisma.event.update({
      where: { id },
      data: updateEventDto,
      include: { chat: { select: { id: true } } },
    });
    return this.toResponse(event);
  }

  async remove(id: string): Promise<ResponseEventDto> {
    const event = await this.prisma.event.delete({
      where: { id },
      include: { chat: { select: { id: true } } },
    });
    return this.toResponse(event);
  }

  private toResponse(event: EventWithChat): ResponseEventDto {
    return {
      id: event.id,
      title: event.title,
      topic: event.topic,
      description: event.description,
      startDate: event.startDate,
      endDate: event.endDate,
      longitude: event.longitude,
      latitude: event.latitude,
      placeName: event.placeName,
      organizationId: event.organizationId,
      chatId: event.chat?.id ?? null,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
  }
}
