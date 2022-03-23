import { Controller, Get, Param, ValidationPipe } from '@nestjs/common';
import { CodeValidationDto } from './dto';

@Controller('code')
export class CodeController {
  @Get(':code')
  validate(@Param() params: CodeValidationDto) {
    return params.code;
  }
}
