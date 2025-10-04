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

import { CreateEventDto } from "./dto/create-event.dto";
import { ResponseEventDto } from "./dto/response-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { EventService } from "./event.service";

@ApiTags("Event")
@Controller("event")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: "Create event" })
  @ApiCreatedResponse({ description: "Created event", type: ResponseEventDto })
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  @ApiOperation({ summary: "List events" })
  @ApiOkResponse({
    description: "Array of events",
    type: ResponseEventDto,
    isArray: true,
  })
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get event by id" })
  @ApiOkResponse({ description: "Event", type: ResponseEventDto })
  async findOne(@Param("id") id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update event" })
  @ApiOkResponse({ description: "Updated event", type: ResponseEventDto })
  async update(
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete event" })
  @ApiOkResponse({ description: "Deleted event", type: ResponseEventDto })
  async remove(@Param("id") id: string) {
    return this.eventService.remove(id);
  }
}
