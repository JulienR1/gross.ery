import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
  async find(@Param() { listId }: FindListDto): Promise<ListEntity> {
    const { _id, items, name } = await this.listService.findListById(listId);

    return {
      id: _id.toString(),
      items: items.map(({ _id, name, checked }) => ({
        id: _id.toString(),
        checked,
        name,
      })),
      name,
    };
  }

  @Post()
  createNew(@Body() { name }: CreateListDto): Promise<CreateListEntity> {
    return this.listService.insertList(name);
  }

  @Delete()
  async remove(@Body() { listId }: DeleteListDto): Promise<ListEntity> {
    const { _id, items, name } = await this.listService.removeList(listId);
    return {
      id: _id.toString(),
      items: items.map(({ _id, name, checked }) => ({
        id: _id.toString(),
        checked,
        name,
      })),
      name,
    };
  }
}
