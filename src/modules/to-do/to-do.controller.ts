import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiBody,
} from '@nestjs/swagger';

import { ToDoService } from './to-do.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import {
  TaskResponseDto,
  TasksResponseDto,
} from './dtos/api-response.dto';

@ApiTags('tasks')
@Controller('tasks')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 200, type: TasksResponseDto })
  getAllTasks() {
    return this.toDoService.getAllTasks();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiNotFoundResponse({ description: 'Task not found' })
  getTaskById(@Param('id', ParseIntPipe) id: number) {
    return this.toDoService.getTaskById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create new task' })
  @ApiCreatedResponse({ type: TaskResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBody({ type: CreateTaskDto })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.toDoService.createTask(createTaskDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid input' })
  @ApiBody({ type: UpdateTaskDto }) 
  updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.toDoService.updateTask(id, updateTaskDto);
  }

  @Put(':id/complete')
  @ApiOperation({ summary: 'Mark task as complete' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  completeTask(@Param('id', ParseIntPipe) id: number) {
    return this.toDoService.completeTask(id);
  }

  @Put(':id/archive')
  @ApiOperation({ summary: 'Archive or unarchive task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: TaskResponseDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        archived: {
          type: 'boolean',
          enum: [true, false], 
          example: false,
        },
      },
      required: ['archived'],
    },
  })
  toggleArchive(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: { archived: boolean },
  ) {
    return this.toDoService.updateArchiveStatus(id, body.archived);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete task' })
  @ApiParam({ name: 'id', type: Number })
  @ApiNoContentResponse({ description: 'Task deleted successfully' })
  deleteTask(@Param('id', ParseIntPipe) id: number) {
    return this.toDoService.deleteTask(id);
  }
}
