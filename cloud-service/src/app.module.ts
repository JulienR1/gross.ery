import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [ListModule, InfoModule],
})
export class AppModule {}
