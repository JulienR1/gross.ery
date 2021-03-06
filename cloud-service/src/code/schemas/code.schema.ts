import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CodeDocument = Code & Document;

@Schema()
export class Code {
  @Prop()
  code: string;
}

export const CodeSchema = SchemaFactory.createForClass(Code);
