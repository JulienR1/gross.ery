import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';
import { InfoModule } from './info/info.module';
import { CodeModule } from './code/code.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validate }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URL'),
      }),
      inject: [ConfigService],
      imports: [ConfigModule],
    }),
    ListModule,
    InfoModule,
    CodeModule,
    AdminModule,
  ],
})
export class AppModule {}
