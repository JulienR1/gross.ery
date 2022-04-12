import { Body, Controller, Put, Post, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { Types } from 'mongoose';
import { CreateItemDto, DeleteItemDto, UpdateItemDto } from 'shared';

@Controller('list/item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Put()
  createNewItem(@Body() { listId, itemName }: CreateItemDto) {
    return this.itemService.withList(listId).createItem(itemName);
  }

  @Post()
  updateItem(@Body() { listId, item }: UpdateItemDto) {
    const { id, ...itemData } = item;
    const _id = new Types.ObjectId(id);
    return this.itemService.withList(listId).updateItem({ _id, ...itemData });
  }

  @Delete()
  removeItem(@Body() { listId, itemId }: DeleteItemDto) {
    const _id = new Types.ObjectId(itemId);
    return this.itemService.withList(listId).deleteItem(_id);
  }
}
