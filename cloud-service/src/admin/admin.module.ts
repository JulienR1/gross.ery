import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from '../list/schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
