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

import { CreateTaskDto } from "./dto/create-task.dto";
import { ResponseTaskDto } from "./dto/response-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskService } from "./task.service";

@ApiTags("Task")
@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: "Create task" })
  @ApiCreatedResponse({ description: "Created task", type: ResponseTaskDto })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: "List tasks" })
  @ApiOkResponse({
    description: "Array of tasks",
    type: ResponseTaskDto,
    isArray: true,
  })
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get task by id" })
  @ApiOkResponse({ description: "Task", type: ResponseTaskDto })
  async findOne(@Param("id") id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update task" })
  @ApiOkResponse({ description: "Updated task", type: ResponseTaskDto })
  async update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete task" })
  @ApiOkResponse({ description: "Deleted task", type: ResponseTaskDto })
  async remove(@Param("id") id: string) {
    return this.taskService.remove(id);
  }
}
