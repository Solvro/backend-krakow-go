import type { ResponseEventRecommendationDto } from "src/event-recommendation/dto/response-event-recommendation.dto";
import { toEventRecommendationResponse } from "src/event-recommendation/event-recommendation.mapper";
import { PrismaService } from "src/prisma/prisma.service";

import { Injectable, NotFoundException } from "@nestjs/common";

import { CreateVolunteerDto } from "./dto/create-volunteer.dto";
import { ResponseVolunteerDto } from "./dto/response-volunteer.dto";
import { UpdateVolunteerDto } from "./dto/update-volunteer.dto";

@Injectable()
export class VolunteerService {
  constructor(private prisma: PrismaService) {}

  async create(
    createVolunteerDto: CreateVolunteerDto,
  ): Promise<ResponseVolunteerDto> {
    return this.prisma.volunteer.create({
      data: createVolunteerDto,
      include: { certificates: true },
    });
  }

  async findAll(): Promise<ResponseVolunteerDto[]> {
    return this.prisma.volunteer.findMany({
      include: { certificates: true },
    });
  }

  async findOne(id: string): Promise<ResponseVolunteerDto | null> {
    return this.prisma.volunteer.findUnique({
      where: { id },
      include: { certificates: true },
    });
  }

  async update(
    id: string,
    updateVolunteerDto: UpdateVolunteerDto,
  ): Promise<ResponseVolunteerDto> {
    return this.prisma.volunteer.update({
      where: { id },
      data: updateVolunteerDto,
      include: { certificates: true },
    });
  }

  async remove(id: string): Promise<ResponseVolunteerDto> {
    return this.prisma.volunteer.delete({
      where: { id },
      include: { certificates: true },
    });
  }

  async getRecommendations(
    id: string,
  ): Promise<ResponseEventRecommendationDto[]> {
    const volunteer = await this.prisma.volunteer.findUnique({
      where: { id },
      select: { id: true },
    });

    if (volunteer === null) {
      throw new NotFoundException("Volunteer not found");
    }

    const recommendations = await this.prisma.eventRecommendation.findMany({
      where: { volunteerId: id },
      include: {
        event: {
          include: { chat: { select: { id: true } } },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return recommendations.map((recommendation) =>
      toEventRecommendationResponse(recommendation),
    );
  }
}
