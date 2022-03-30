import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Item } from './item.schema';

export type ListDocument = List & Document;

@Schema({ collection: 'listes' })
export class List {
  @Prop()
  name: string;

  @Prop()
  items: Item[];
}

export const ListSchema = SchemaFactory.createForClass(List);
