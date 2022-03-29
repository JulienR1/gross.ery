import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
  imports: [ConfigModule],
  controllers: [InfoController],
  providers: [InfoService],
})
export class InfoModule {}
