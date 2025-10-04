import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from "@nestjs/swagger";

import { CreateSubmissionDto } from "./dto/create-submission.dto";
import { ResponseSubmissionDto } from "./dto/response-submission.dto";
import { UpdateSubmissionDto } from "./dto/update-submission.dto";
import { SubmissionService } from "./submission.service";

@ApiTags("Submission")
@Controller("submission")
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @ApiOperation({ summary: "Create submission" })
  @ApiCreatedResponse({
    description: "Created submission",
    type: ResponseSubmissionDto,
  })
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionService.create(createSubmissionDto);
  }

  @Get()
  @ApiOperation({ summary: "List submissions" })
  @ApiOkResponse({
    description: "Array of submissions",
    type: ResponseSubmissionDto,
    isArray: true,
  })
  async findAll() {
    return this.submissionService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get submission by id" })
  @ApiOkResponse({ description: "Submission", type: ResponseSubmissionDto })
  async findOne(@Param("id") id: string) {
    return this.submissionService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update submission" })
  @ApiOkResponse({
    description: "Updated submission",
    type: ResponseSubmissionDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateSubmissionDto: UpdateSubmissionDto,
  ) {
    return this.submissionService.update(id, updateSubmissionDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete submission" })
  @ApiOkResponse({
    description: "Deleted submission",
    type: ResponseSubmissionDto,
  })
  async remove(@Param("id") id: string) {
    return this.submissionService.remove(id);
  }
}
