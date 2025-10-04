import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateOrganizationDto } from "./dto/create-organization.dto";
import { ResponseOrganizationDto } from "./dto/response-organization.dto";
import { UpdateOrganizationDto } from "./dto/update-organization.dto";

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async create(
    createOrganizationDto: CreateOrganizationDto,
  ): Promise<ResponseOrganizationDto> {
    return await this.prisma.organization.create({
      data: createOrganizationDto,
    });
  }

  async findAll(): Promise<ResponseOrganizationDto[]> {
    return this.prisma.organization.findMany();
  }

  async findOne(id: string): Promise<ResponseOrganizationDto | null> {
    return this.prisma.organization.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateOrganizationDto: UpdateOrganizationDto,
  ): Promise<ResponseOrganizationDto> {
    return this.prisma.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  async remove(id: string): Promise<ResponseOrganizationDto> {
    return this.prisma.organization.delete({ where: { id } });
  }
}
