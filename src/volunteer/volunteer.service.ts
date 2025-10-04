import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

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
}
