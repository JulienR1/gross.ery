import { Body, Controller, Delete, Get, Param, Put } from '@nestjs/common';
import { CreateListDto, DeleteListDto } from './dto';

@Controller('list')
export class ListController {
  @Get()
  find() {
    return 'Hello world!';
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return 'Hello world' + id;
  }

  @Put()
  createNew(@Body() createListDto: CreateListDto) {
    return createListDto;
  }

  @Delete()
  remove(@Body() deleteListDto: DeleteListDto) {
    return deleteListDto;
  }
}
