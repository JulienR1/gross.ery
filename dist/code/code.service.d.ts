import { Model } from 'mongoose';
import { CodeDocument } from './schemas/code.schema';
export declare class CodeService {
    private codeModel;
    constructor(codeModel: Model<CodeDocument>);
    validateCode(code: string): Promise<{
        isValid: boolean;
    }>;
}
