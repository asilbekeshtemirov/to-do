import { ApiProperty } from '@nestjs/swagger';
import { TaskEntity } from '../entities/task.entity';

export class ApiResponseDto<T = any> {
  @ApiProperty({
    description: 'Request success status',
    example: true,
  })
  success: boolean;

  @ApiProperty({
    description: 'Response message',
    example: 'Operation completed successfully',
  })
  message: string;
}

export class TaskResponseDto extends ApiResponseDto {
  @ApiProperty({
    description: 'Task data',
    type: TaskEntity,
  })
  data: TaskEntity;
}

export class TasksResponseDto extends ApiResponseDto {
  @ApiProperty({
    description: 'Tasks array',
    type: [TaskEntity],
  })
  data: TaskEntity[];

  @ApiProperty({
    description: 'Total number of tasks',
    example: 5,
  })
  count: number;
}

export class DeleteResponseDto extends ApiResponseDto { }
