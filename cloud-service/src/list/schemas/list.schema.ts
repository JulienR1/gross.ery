import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item, ItemSchema } from './item.schema';

export type ListDocument = List & Document;

@Schema({ collection: 'listes' })
export class List {
  @Prop()
  name: string;

  @Prop({ type: [ItemSchema] })
  items: Item[];
}

export const ListSchema = SchemaFactory.createForClass(List);
