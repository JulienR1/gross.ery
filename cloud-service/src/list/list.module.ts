import { Module } from '@nestjs/common';
import { ListController, ListService } from './list';
import { ItemController, ItemService } from './item';

@Module({
  imports: [],
  controllers: [ListController, ItemController],
  providers: [ListService, ItemService],
})
export class ListModule {}
