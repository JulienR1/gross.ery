import { Module } from '@nestjs/common';
import { ListController, ListService } from './list';
import { ItemController, ItemService } from './item';
import { MongooseModule } from '@nestjs/mongoose';
import { List, ListSchema } from './schemas/list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: List.name, schema: ListSchema }]),
  ],
  controllers: [ListController, ItemController],
  providers: [ListService, ItemService],
})
export class ListModule {}
