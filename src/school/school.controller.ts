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

import { CreateSchoolDto } from "./dto/create-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { SchoolService } from "./school.service";

@ApiTags("School")
@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiOperation({ summary: "Create school" })
  @ApiOkResponse({ description: "Created school" })
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @ApiOperation({ summary: "List schools" })
  @ApiOkResponse({ description: "Array of schools" })
  async findAll() {
    return this.schoolService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get school by id" })
  @ApiOkResponse({ description: "School" })
  async findOne(@Param("id") id: string) {
    return this.schoolService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update school" })
  @ApiOkResponse({ description: "Updated school" })
  async update(
    @Param("id") id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete school" })
  @ApiOkResponse({ description: "Deletion result" })
  async remove(@Param("id") id: string) {
    return this.schoolService.remove(id);
  }
}
