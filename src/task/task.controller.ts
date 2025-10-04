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

import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TaskService } from "./task.service";

@ApiTags("Task")
@Controller("task")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  @ApiOperation({ summary: "Create task" })
  @ApiOkResponse({ description: "Created task" })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: "List tasks" })
  @ApiOkResponse({ description: "Array of tasks" })
  async findAll() {
    return this.taskService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get task by id" })
  @ApiOkResponse({ description: "Task" })
  async findOne(@Param("id") id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update task" })
  @ApiOkResponse({ description: "Updated task" })
  async update(@Param("id") id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete task" })
  @ApiOkResponse({ description: "Deletion result" })
  async remove(@Param("id") id: string) {
    return this.taskService.remove(id);
  }
}
