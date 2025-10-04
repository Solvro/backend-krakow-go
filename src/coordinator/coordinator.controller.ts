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

import { CoordinatorService } from "./coordinator.service";
import { CreateCoordinatorDto } from "./dto/create-coordinator.dto";
import { UpdateCoordinatorDto } from "./dto/update-coordinator.dto";

@ApiTags("Coordinator")
@Controller("coordinator")
export class CoordinatorController {
  constructor(private readonly coordinatorService: CoordinatorService) {}

  @Post()
  @ApiOperation({ summary: "Create coordinator" })
  @ApiOkResponse({ description: "Created coordinator" })
  async create(@Body() createCoordinatorDto: CreateCoordinatorDto) {
    return this.coordinatorService.create(createCoordinatorDto);
  }

  @Get()
  @ApiOperation({ summary: "List coordinators" })
  @ApiOkResponse({ description: "Array of coordinators" })
  async findAll() {
    return this.coordinatorService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get coordinator by id" })
  @ApiOkResponse({ description: "Coordinator" })
  async findOne(@Param("id") id: string) {
    return this.coordinatorService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update coordinator" })
  @ApiOkResponse({ description: "Updated coordinator" })
  async update(
    @Param("id") id: string,
    @Body() updateCoordinatorDto: UpdateCoordinatorDto,
  ) {
    return this.coordinatorService.update(id, updateCoordinatorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete coordinator" })
  @ApiOkResponse({ description: "Deletion result" })
  async remove(@Param("id") id: string) {
    return this.coordinatorService.remove(id);
  }
}
