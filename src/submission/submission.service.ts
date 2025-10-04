import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { ResponseSubmissionDto } from "./dto/response-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";

@Injectable()
export class SubmissionService {
  constructor(private prisma: PrismaService) {}

  async create(
    createSubmissionDto: CreateSubmissionDto,
  ): Promise<ResponseSubmissionDto> {
    return this.prisma.submission.create({ data: createSubmissionDto });
  }

  async findAll(): Promise<ResponseSubmissionDto[]> {
    return this.prisma.submission.findMany();
  }

  async findOne(id: string): Promise<ResponseSubmissionDto | null> {
    return this.prisma.submission.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateSubmissionDto: UpdateSubmissionDto,
  ): Promise<ResponseSubmissionDto> {
    return this.prisma.submission.update({
      where: { id },
      data: updateSubmissionDto,
    });
  }

  async remove(id: string): Promise<ResponseSubmissionDto> {
    return this.prisma.submission.delete({ where: { id } });
  }
}
