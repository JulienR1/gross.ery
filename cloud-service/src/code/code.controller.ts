import { Controller, Get, Param } from '@nestjs/common';
import { CodeService } from './code.service';

import { CodeValidationDto } from 'shared';

@Controller('code')
export class CodeController {
  constructor(private codeService: CodeService) {}

  @Get(':code')
  validate(@Param() params: CodeValidationDto) {
    return this.codeService.validateCode(params.code);
  }
}
