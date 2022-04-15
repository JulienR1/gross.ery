import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service';
import { AppInfoEntity } from 'shared';

@Controller('info')
export class InfoController {
  constructor(private infoService: InfoService) {}

  @Get()
  getInfo(): AppInfoEntity {
    return { app: this.infoService.getAppVersion() };
  }
}
