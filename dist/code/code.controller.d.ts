import { CodeValidationDto, CodeValidationEntity } from 'shared';
import { CodeService } from './code.service';
export declare class CodeController {
    private codeService;
    constructor(codeService: CodeService);
    validate(params: CodeValidationDto): Promise<CodeValidationEntity>;
}
