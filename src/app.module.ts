import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ToDoModule } from './modules/to-do/to-do.module';

@Module({
  imports: [PrismaModule, ToDoModule],
})
export class AppModule {}