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

import { CreateSchoolDto } from "./dto/create-school.dto";
import { ResponseSchoolDto } from "./dto/response-school.dto";
import { UpdateSchoolDto } from "./dto/update-school.dto";
import { SchoolService } from "./school.service";

@ApiTags("School")
@Controller("school")
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @ApiOperation({ summary: "Create school" })
  @ApiCreatedResponse({
    description: "Created school",
    type: ResponseSchoolDto,
  })
  async create(@Body() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.create(createSchoolDto);
  }

  @Get()
  @ApiOperation({ summary: "List schools" })
  @ApiOkResponse({
    description: "Array of schools",
    type: ResponseSchoolDto,
    isArray: true,
  })
  async findAll() {
    return this.schoolService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get school by id" })
  @ApiOkResponse({ description: "School", type: ResponseSchoolDto })
  async findOne(@Param("id") id: string) {
    return this.schoolService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update school" })
  @ApiOkResponse({ description: "Updated school", type: ResponseSchoolDto })
  async update(
    @Param("id") id: string,
    @Body() updateSchoolDto: UpdateSchoolDto,
  ) {
    return this.schoolService.update(id, updateSchoolDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete school" })
  @ApiOkResponse({ description: "Deleted school", type: ResponseSchoolDto })
  async remove(@Param("id") id: string) {
    return this.schoolService.remove(id);
  }
}
