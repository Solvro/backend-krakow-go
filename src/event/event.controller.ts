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

import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventService } from "./event.service";

@ApiTags("Event")
@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: "Create event" })
  @ApiOkResponse({ description: "Created event" })
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: "List events" })
  @ApiOkResponse({ description: "Array of events" })
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get event by id" })
  @ApiOkResponse({ description: "Event" })
  async findOne(@Param("id") id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update event" })
  @ApiOkResponse({ description: "Updated event" })
  async update(
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete event" })
  @ApiOkResponse({ description: "Deletion result" })
  async remove(@Param("id") id: string) {
    return this.eventService.remove(id);
  }
}
