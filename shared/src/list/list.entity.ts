import { ItemEntity } from "../item/item.entity";

export class ListEntity {
  id: string;
  name: string;
  items: ItemEntity[];
}
