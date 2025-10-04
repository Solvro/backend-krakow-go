import { PrismaService } from "src/prisma/prisma.service";

import { Module } from "@nestjs/common";

import { SchoolController } from "./school.controller";
import { SchoolService } from "./school.service";

@Module({
  controllers: [SchoolController],
  providers: [SchoolService, PrismaService],
})
export class SchoolModule {}
