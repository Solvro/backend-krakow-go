import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { SubmissionService } from "./submission.service";

@ApiTags("Submission")
@Controller("submission")
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @ApiOperation({ summary: "Create submission" })
  @ApiOkResponse({ description: "Created submission" })
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionService.create(createSubmissionDto);
  }

  @Get()
  @ApiOperation({ summary: "List submissions" })
  @ApiOkResponse({ description: "Array of submissions" })
  async findAll() {
    return this.submissionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get submission by id" })
  @ApiOkResponse({ description: "Submission" })
  async findOne(@Param("id") id: string) {
    return this.submissionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update submission" })
  @ApiOkResponse({ description: "Updated submission" })
  async update(
    @Param("id") id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ) {
    return this.submissionService.update(id, updateSubmissionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete submission" })
  @ApiOkResponse({ description: "Deletion result" })
  async remove(@Param("id") id: string) {
    return this.submissionService.remove(id);
  }
}
