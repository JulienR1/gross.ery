import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import {
  CreateListDto,
  CreateListEntity,
  DeleteListDto,
  FindListDto,
  ListEntity,
} from 'shared';

import { ListService } from './list.service';

@Controller('list')
export class ListController {
  constructor(private listService: ListService) {}

  @Get(':listId')
  find(@Param() { listId }: FindListDto): Promise<ListEntity> {
    return this.listService.findListById(listId);
  }

  @Put()
  createNew(@Body() { name }: CreateListDto): Promise<CreateListEntity> {
    return this.listService.insertList(name);
  }

  @Delete()
  remove(@Body() { listId }: DeleteListDto): Promise<ListEntity> {
    return this.listService.removeList(listId);
  }
}
