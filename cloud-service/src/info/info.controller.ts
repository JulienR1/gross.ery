import { Controller, Get } from '@nestjs/common';

@Controller('info')
export class InfoController {
  @Get()
  getInfo() {
    return { app: 'TODO' };
  }
}
