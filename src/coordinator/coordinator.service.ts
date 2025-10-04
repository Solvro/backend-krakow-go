import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

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
}
