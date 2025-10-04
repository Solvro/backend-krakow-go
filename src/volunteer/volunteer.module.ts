import { PrismaService } from "src/prisma/prisma.service";

import { Module } from "@nestjs/common";

import { VolunteerController } from "./volunteer.controller";
import { VolunteerService } from "./volunteer.service";

@Module({
  controllers: [VolunteerController],
  providers: [VolunteerService, PrismaService],
})
export class VolunteerModule {}
