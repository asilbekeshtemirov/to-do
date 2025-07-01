import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Title of the task',
    example: 'Complete project documentation',
    minLength: 1,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  @MinLength(1, { message: 'Title must be at least 1 character' })
  @MaxLength(200, { message: 'Title must not exceed 200 characters' })
  title: string;

  @ApiPropertyOptional({
    description: 'Detailed description of the task',
    example:
      'Write full documentation for the API, including setup and endpoints',
    maxLength: 1000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: 'Description must not exceed 1000 characters' })
  description?: string;
}
