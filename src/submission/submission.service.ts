import { Prisma, Submission, SubmissionStatus } from "@prisma/client";
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
    return this.prisma.$transaction(async (tx) => {
      const submission = await tx.submission.create({
        data: createSubmissionDto,
      });

      if (submission.status === SubmissionStatus.APPROVED) {
        await this.grantParticipationRewards(tx, submission);
      }

      return submission;
    });
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
    return this.prisma.$transaction(async (tx) => {
      const existingSubmission = await tx.submission.findUnique({
        where: { id },
      });

      const updatedSubmission = await tx.submission.update({
        where: { id },
        data: updateSubmissionDto,
      });

      if (
        existingSubmission?.status !== SubmissionStatus.APPROVED &&
        updatedSubmission.status === SubmissionStatus.APPROVED
      ) {
        await this.grantParticipationRewards(tx, updatedSubmission);
      }

      return updatedSubmission;
    });
  }

  async remove(id: string): Promise<ResponseSubmissionDto> {
    return this.prisma.submission.delete({ where: { id } });
  }

  private async grantParticipationRewards(
    tx: Prisma.TransactionClient,
    submission: Submission,
  ): Promise<void> {
    const { volunteerId, eventId } = submission;

    const existingCertificate = await tx.attendanceCertificate.findUnique({
      where: {
        volunteerId_eventId: {
          volunteerId,
          eventId,
        },
      },
    });

    if (existingCertificate !== null) {
      return;
    }

    const tasksCount = await tx.task.count({
      where: {
        volunteerId,
        eventId,
      },
    });

    const pointsAwarded = tasksCount;

    try {
      await tx.attendanceCertificate.create({
        data: {
          volunteerId,
          eventId,
          tasksCount,
          points: pointsAwarded,
        },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return;
      }

      throw error;
    }

    if (pointsAwarded > 0) {
      await tx.volunteer.update({
        where: { id: volunteerId },
        data: {
          points: { increment: pointsAwarded },
        },
      });
    }
  }
}
