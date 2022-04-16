import { Body, Controller, Put, Post, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { Types } from 'mongoose';
import { CreateItemDto, DeleteItemDto, UpdateItemDto } from 'shared';

@Controller('list/item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  createNewItem(@Body() { listId, itemName }: CreateItemDto) {
    this.itemService.withList(listId).createItem(itemName);
    return { success: true };
  }

  @Put()
  updateItem(@Body() { listId, item }: UpdateItemDto) {
    const { id, ...itemData } = item;
    const _id = new Types.ObjectId(id);
    this.itemService.withList(listId).updateItem({ _id, ...itemData });
    return { success: true };
  }

  @Delete()
  removeItem(@Body() { listId, itemId }: DeleteItemDto) {
    const _id = new Types.ObjectId(itemId);
    this.itemService.withList(listId).deleteItem(_id);
    return { success: true };
  }
}
