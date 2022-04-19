import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Code, CodeDocument } from './schemas/code.schema';

@Injectable()
export class CodeService {
  constructor(@InjectModel(Code.name) private codeModel: Model<CodeDocument>) {}

  async validateCode(code: string) {
    const removedCode = await this.codeModel.findOneAndDelete({ code }).exec();
    return { isValid: !!removedCode };
  }
}
