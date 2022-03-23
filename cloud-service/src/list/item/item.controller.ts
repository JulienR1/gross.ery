import { Body, Controller, Put, Post, Delete } from '@nestjs/common';
import { CreateItemDto, DeleteItemDto, UpdateItemDto } from './dto';

@Controller('list/item')
export class ItemController {
  @Put()
  createNewItem(@Body() createItemDto: CreateItemDto) {
    return createItemDto;
  }

  @Post()
  updateItem(@Body() updateItemDto: UpdateItemDto) {
    return updateItemDto;
  }

  @Delete()
  removeItem(@Body() deleteItemDto: DeleteItemDto) {
    return deleteItemDto;
  }
}
