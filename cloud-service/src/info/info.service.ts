import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InfoService {
  constructor(private configService: ConfigService) {}

  getAppVersion() {
    return this.configService.get<string>('APP_VERSION');
  }
}
