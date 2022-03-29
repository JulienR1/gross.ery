import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get()
  getInfo() {
    return { app: this.infoService.getAppVersion() };
  }
}
