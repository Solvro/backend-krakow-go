import { PrismaService } from "src/prisma/prisma.service";

import { Module } from "@nestjs/common";

import { CoordinatorController } from "./coordinator.controller";
import { CoordinatorService } from "./coordinator.service";

@Module({
  controllers: [CoordinatorController],
  providers: [CoordinatorService, PrismaService],
})
export class CoordinatorModule {}
