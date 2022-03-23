import { Body, Controller, Put, Post } from '@nestjs/common';
import { CreateItemDto, UpdateItemDto } from './dto';

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
}
