import { PrismaService } from "src/prisma/prisma.service";

import { Injectable } from "@nestjs/common";

import { CreateTaskDto } from "./dto/create-task.dto";
import { ResponseTaskDto } from "./dto/response-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async create(createTaskDto: CreateTaskDto): Promise<ResponseTaskDto> {
    return this.prisma.task.create({ data: createTaskDto });
  }

  async findAll(): Promise<ResponseTaskDto[]> {
    return this.prisma.task.findMany();
  }

  async findOne(id: string): Promise<ResponseTaskDto | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
  ): Promise<ResponseTaskDto> {
    return this.prisma.task.update({ where: { id }, data: updateTaskDto });
  }

  async remove(id: string): Promise<ResponseTaskDto> {
    return this.prisma.task.delete({ where: { id } });
  }
}
