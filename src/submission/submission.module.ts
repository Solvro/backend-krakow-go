import { PrismaService } from "src/prisma/prisma.service";

import { Module } from "@nestjs/common";

import { SubmissionController } from "./submission.controller";
import { SubmissionService } from "./submission.service";

@Module({
  controllers: [SubmissionController],
  providers: [SubmissionService, PrismaService],
})
export class SubmissionModule {}
