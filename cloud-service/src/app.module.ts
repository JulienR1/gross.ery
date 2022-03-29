import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { InfoModule } from './info/info.module';
import { CodeModule } from './code/code.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    ListModule,
    InfoModule,
    CodeModule,
  ],
})
export class AppModule {}
