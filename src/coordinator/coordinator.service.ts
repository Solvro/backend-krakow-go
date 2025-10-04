import type { RecommendEventDto } from "src/event-recommendation/dto/recommend-event.dto";
import type { ResponseEventRecommendationDto } from "src/event-recommendation/dto/response-event-recommendation.dto";
import { toEventRecommendationResponse } from "src/event-recommendation/event-recommendation.mapper";
import type { RecommendationWithEvent } from "src/event-recommendation/event-recommendation.mapper";
import { PrismaService } from "src/prisma/prisma.service";

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { CreateCoordinatorDto } from "./dto/create-coordinator.dto";
import { ResponseCoordinatorDto } from "./dto/response-coordinator.dto";
import { UpdateCoordinatorDto } from "./dto/update-coordinator.dto";

@Injectable()
export class CoordinatorService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCoordinatorDto: CreateCoordinatorDto,
  ): Promise<ResponseCoordinatorDto> {
    return this.prisma.coordinator.create({ data: createCoordinatorDto });
  }

  async findAll(): Promise<ResponseCoordinatorDto[]> {
    return this.prisma.coordinator.findMany();
  }

  async findOne(id: string): Promise<ResponseCoordinatorDto | null> {
    return this.prisma.coordinator.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateCoordinatorDto: UpdateCoordinatorDto,
  ): Promise<ResponseCoordinatorDto> {
    return this.prisma.coordinator.update({
      where: { id },
      data: updateCoordinatorDto,
    });
  }

  async remove(id: string): Promise<ResponseCoordinatorDto> {
    return this.prisma.coordinator.delete({ where: { id } });
  }

  async recommendEvent(
    coordinatorId: string,
    recommendEventDto: RecommendEventDto,
  ): Promise<ResponseEventRecommendationDto[]> {
    const coordinator = await this.prisma.coordinator.findUnique({
      where: { id: coordinatorId },
      include: { school: true },
    });

    if (coordinator === null) {
      throw new NotFoundException("Coordinator not found");
    }

    if (coordinator.schoolId === null) {
      throw new BadRequestException(
        "Coordinator must be assigned to a school to recommend events",
      );
    }

    const event = await this.prisma.event.findUnique({
      where: { id: recommendEventDto.eventId },
    });

    if (event === null) {
      throw new NotFoundException("Event not found");
    }

    const volunteers = await this.prisma.volunteer.findMany({
      where: { id: { in: recommendEventDto.volunteerIds } },
      select: { id: true, schoolId: true },
    });

    const providedIds = new Set(recommendEventDto.volunteerIds);
    const foundIds = new Set(volunteers.map((volunteer) => volunteer.id));
    const missingIds = [...providedIds].filter((id) => !foundIds.has(id));

    if (missingIds.length > 0) {
      throw new BadRequestException(
        `Volunteers not found: ${missingIds.join(", ")}`,
      );
    }

    const invalidSchoolVolunteers = volunteers.filter(
      (volunteer) => volunteer.schoolId !== coordinator.schoolId,
    );

    if (invalidSchoolVolunteers.length > 0) {
      throw new BadRequestException(
        "All volunteers must belong to the coordinator's school",
      );
    }

    const recommendations = await this.prisma.$transaction<
      RecommendationWithEvent[]
    >(async (tx) => {
      const created: RecommendationWithEvent[] = [];

      for (const volunteerId of recommendEventDto.volunteerIds) {
        const recommendation = await tx.eventRecommendation.upsert({
          where: {
            coordinatorId_volunteerId_eventId: {
              coordinatorId,
              volunteerId,
              eventId: recommendEventDto.eventId,
            },
          },
          create: {
            coordinatorId,
            volunteerId,
            eventId: recommendEventDto.eventId,
            message: recommendEventDto.message ?? null,
          },
          update: {
            message: recommendEventDto.message ?? null,
          },
          include: {
            event: {
              include: { chat: { select: { id: true } } },
            },
          },
        });

        created.push(recommendation);
      }

      return created;
    });

    return recommendations.map((recommendation) =>
      toEventRecommendationResponse(recommendation),
    );
  }
}
