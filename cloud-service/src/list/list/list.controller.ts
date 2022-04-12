import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CreateListDto, DeleteListDto, FindListDto } from 'shared';
import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get(':listId')
  find(@Param() { listId }: FindListDto) {
    return this.listService.findListById(listId);
  }

  @Put()
  createNew(@Body() { name }: CreateListDto) {
    return this.listService.insertList(name);
  }

  @Delete()
  remove(@Body() { listId }: DeleteListDto) {
    return this.listService.removeList(listId);
  }
}
