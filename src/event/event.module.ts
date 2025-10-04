import { PrismaService } from "src/prisma/prisma.service";

import { Module } from "@nestjs/common";

import { EventController } from "./event.controller";
import { EventService } from "./event.service";

@Module({
  controllers: [EventController],
  providers: [EventService, PrismaService],
})
export class EventModule {}
