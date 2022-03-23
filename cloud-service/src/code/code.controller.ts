import { Controller, Get, Param } from '@nestjs/common';

@Controller('code')
export class CodeController {
  @Get(':code')
  validate(@Param('code') code: string) {
    return code;
  }
}
