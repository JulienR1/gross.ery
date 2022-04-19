import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';
import { Code, CodeSchema } from './schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Code.name, schema: CodeSchema }]),
  ],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
