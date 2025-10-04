import { RecommendEventDto } from "src/event-recommendation/dto/recommend-event.dto";
import { ResponseEventRecommendationDto } from "src/event-recommendation/dto/response-event-recommendation.dto";

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

import { CoordinatorService } from "./coordinator.service";
import { CreateCoordinatorDto } from "./dto/create-coordinator.dto";
import { ResponseCoordinatorDto } from "./dto/response-coordinator.dto";
import { UpdateCoordinatorDto } from "./dto/update-coordinator.dto";

@ApiTags("Coordinator")
@Controller("coordinator")
export class CoordinatorController {
  constructor(private readonly coordinatorService: CoordinatorService) {}

  @Post()
  @ApiOperation({ summary: "Create coordinator" })
  @ApiCreatedResponse({
    description: "Created coordinator",
    type: ResponseCoordinatorDto,
  })
  async create(@Body() createCoordinatorDto: CreateCoordinatorDto) {
    return this.coordinatorService.create(createCoordinatorDto);
  }

  @Get()
  @ApiOperation({ summary: "List coordinators" })
  @ApiOkResponse({
    description: "Array of coordinators",
    type: ResponseCoordinatorDto,
    isArray: true,
  })
  async findAll() {
    return this.coordinatorService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get coordinator by id" })
  @ApiOkResponse({ description: "Coordinator", type: ResponseCoordinatorDto })
  async findOne(@Param("id") id: string) {
    return this.coordinatorService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update coordinator" })
  @ApiOkResponse({
    description: "Updated coordinator",
    type: ResponseCoordinatorDto,
  })
  async update(
    @Param("id") id: string,
    @Body() updateCoordinatorDto: UpdateCoordinatorDto,
  ) {
    return this.coordinatorService.update(id, updateCoordinatorDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete coordinator" })
  @ApiOkResponse({
    description: "Deleted coordinator",
    type: ResponseCoordinatorDto,
  })
  async remove(@Param("id") id: string) {
    return this.coordinatorService.remove(id);
  }

  @Post(":id/recommendations")
  @ApiOperation({ summary: "Recommend event to volunteers" })
  @ApiCreatedResponse({
    description: "Created or updated event recommendations",
    type: ResponseEventRecommendationDto,
    isArray: true,
  })
  async recommendEvent(
    @Param("id") coordinatorId: string,
    @Body() recommendEventDto: RecommendEventDto,
  ) {
    return this.coordinatorService.recommendEvent(
      coordinatorId,
      recommendEventDto,
    );
  }
}
