import { ApiProperty } from '@nestjs/swagger';

export class TaskEntity {
  @ApiProperty({
    description: 'Unique identifier of the task',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
  })
  title: string;

  @ApiProperty({
    description: 'Detailed description of the task (nullable)',
    example: 'Includes API endpoints and setup instructions',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Whether the task is completed',
    example: false,
  })
  completed: boolean;

  @ApiProperty({
    description: 'Whether the task is archived',
    example: false,
  })
  archived: boolean;

  @ApiProperty({
    description: 'Timestamp when the task was created',
    example: '2024-01-15T10:30:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Timestamp when the task was last updated',
    example: '2024-01-15T10:45:00.000Z',
  })
  updatedAt: Date;

  @ApiProperty({
    description: 'Timestamp when the task was completed (nullable)',
    example: '2024-01-15T11:00:00.000Z',
    nullable: true,
  })
  completedAt: Date | null;
}
