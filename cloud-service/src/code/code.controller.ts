import { Controller, Get, Param } from '@nestjs/common';
import { CodeValidationDto, CodeValidationEntity } from 'shared';
import { CodeService } from './code.service';

@Controller('code')
export class CodeController {
  constructor(private codeService: CodeService) {}

  @Get(':code')
  validate(@Param() params: CodeValidationDto): Promise<CodeValidationEntity> {
    return this.codeService.validateCode(params.code);
  }
}
