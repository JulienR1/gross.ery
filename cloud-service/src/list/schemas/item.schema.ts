import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Item {
  @Prop()
  name: string;

  @Prop({ default: false })
  checked: boolean;
}
