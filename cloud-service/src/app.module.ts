import { Module } from '@nestjs/common';
import { ListModule } from './list/list.module';

@Module({
  imports: [ListModule],
})
export class AppModule {}
