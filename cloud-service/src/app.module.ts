import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { InfoModule } from './info/info.module';
import { CodeModule } from './code/code.module';

@Module({
  imports: [ListModule, InfoModule, CodeModule],
})
export class AppModule {}
