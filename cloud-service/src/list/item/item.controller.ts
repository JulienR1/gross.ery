import { Body, Controller, Put, Post, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { Types } from 'mongoose';
import {
  CreateItemDto,
  DeleteCheckedItemsDto,
  DeleteItemDto,
  UpdateItemDto,
} from 'shared';

@Controller('list/item')
export class ItemController {
  constructor(private itemService: ItemService) {}

  @Post()
  async createNewItem(@Body() { listId, itemName }: CreateItemDto) {
    await this.itemService.withList(listId).createItem(itemName);
    return { success: true };
  }

  @Put()
  async updateItem(@Body() { listId, item }: UpdateItemDto) {
    const { id, ...itemData } = item;
    const _id = new Types.ObjectId(id);
    await this.itemService.withList(listId).updateItem({ _id, ...itemData });
    return { success: true };
  }

  @Delete()
  async removeItem(@Body() { listId, itemId }: DeleteItemDto) {
    const _id = new Types.ObjectId(itemId);
    await this.itemService.withList(listId).deleteItem(_id);
    return { success: true };
  }

  @Delete('checked')
  async removeCheckedItems(@Body() { listId }: DeleteCheckedItemsDto) {
    await this.itemService.withList(listId).deleteChecked();
    return { success: true };
  }
}
