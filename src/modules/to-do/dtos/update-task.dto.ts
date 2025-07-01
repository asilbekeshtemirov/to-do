import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { IsBoolean, IsOptional } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    description: 'Whether the task is completed',
    example: true,
    enum: [true, false], 
  })
  @IsBoolean({ message: 'Completed must be a boolean value' })
  @IsOptional()
  completed?: boolean;

  @ApiPropertyOptional({
    description: 'Whether the task is archived',
    example: false,
    enum: [true, false], 
  })
  @IsBoolean({ message: 'Archived must be a boolean value' })
  @IsOptional()
  archived?: boolean;
}
