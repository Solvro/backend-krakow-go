import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateSchoolDto } from "./dto/create-school.dto";
import { ResponseSchoolDto } from "./dto/response-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";

@Injectable()
export class SchoolService {
  constructor(private prisma: PrismaService) {}

  async create(createSchoolDto: CreateSchoolDto): Promise<ResponseSchoolDto> {
    return this.prisma.school.create({ data: createSchoolDto });
  }

  async findAll(): Promise<ResponseSchoolDto[]> {
    return this.prisma.school.findMany();
  }

  async findOne(id: string): Promise<ResponseSchoolDto | null> {
    return this.prisma.school.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateSchoolDto: UpdateSchoolDto,
  ): Promise<ResponseSchoolDto> {
    return this.prisma.school.update({ where: { id }, data: updateSchoolDto });
  }

  async remove(id: string): Promise<ResponseSchoolDto> {
    return this.prisma.school.delete({ where: { id } });
  }
}
