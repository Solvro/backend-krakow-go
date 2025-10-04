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

import { CreateVolunteerDto } from "./dto/create-volunteer.dto";
import { UpdateVolunteerDto } from "./dto/update-volunteer.dto";
import { VolunteerService } from "./volunteer.service";

@ApiTags("Volunteer")
@Controller("volunteer")
export class VolunteerController {
  constructor(private readonly volunteerService: VolunteerService) {}

  @Post()
  @ApiOperation({ summary: "Create volunteer" })
  @ApiOkResponse({ description: "Created volunteer" })
  async create(@Body() createVolunteerDto: CreateVolunteerDto) {
    return this.volunteerService.create(createVolunteerDto);
  }

  @Get()
  @ApiOperation({ summary: "List volunteers" })
  @ApiOkResponse({ description: "Array of volunteers" })
  async findAll() {
    return this.volunteerService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get volunteer by id" })
  @ApiOkResponse({ description: "Volunteer" })
  async findOne(@Param("id") id: string) {
    return this.volunteerService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update volunteer" })
  @ApiOkResponse({ description: "Updated volunteer" })
  async update(
    @Param("id") id: string,
    @Body() updateVolunteerDto: UpdateVolunteerDto,
  ) {
    return this.volunteerService.update(id, updateVolunteerDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete volunteer" })
  @ApiOkResponse({ description: "Deletion result" })
  async remove(@Param("id") id: string) {
    return this.volunteerService.remove(id);
  }
}
