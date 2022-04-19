import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Item {
  @Prop()
  _id: Types.ObjectId;

  @Prop()
  name: string;

  @Prop({ default: false })
  checked: boolean;
}

export const ItemSchema = SchemaFactory.createForClass(Item);
