import { PrismaService } from "src/prisma/prisma.service";

import { Module } from "@nestjs/common";

import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
