import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateEventDto } from "./dto/create-event.dto";
import { ResponseEventDto } from "./dto/response-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto): Promise<ResponseEventDto> {
    return this.prisma.event.create({ data: createEventDto });
  }

  async findAll(): Promise<ResponseEventDto[]> {
    return this.prisma.event.findMany();
  }

  async findOne(id: string): Promise<ResponseEventDto | null> {
    return this.prisma.event.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateEventDto: UpdateEventDto,
  ): Promise<ResponseEventDto> {
    return this.prisma.event.update({ where: { id }, data: updateEventDto });
  }

  async remove(id: string): Promise<ResponseEventDto> {
    return this.prisma.event.delete({ where: { id } });
  }
}
