import { Model, Types } from 'mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from '../schemas/list.schema';
import { ListService } from '../list';
import { Item } from '../schemas/item.schema';

@Injectable()
export class ItemService {
  constructor(
    @InjectModel(List.name) private listModel: Model<ListDocument>,
    private listService: ListService,
  ) {}

  withList(listId: string) {
    return {
      createItem: async (itemName: string) => {
        const itemId = new Types.ObjectId();
        const newItem: Item = { _id: itemId, name: itemName, checked: false };
        await this.listModel.findByIdAndUpdate(listId, {
          $push: { items: newItem },
        });
      },
      updateItem: async (update: Item) => {
        const list = await this.listService.findListById(listId.toString());
        const storedItem = list.items.find(({ _id }) => _id.equals(update._id));

        if (!storedItem) {
          throw new BadRequestException('Item not found.');
        }

        await this.listModel.updateOne(
          { _id: listId },
          { $set: { 'items.$[selectedItem]': update } },
          { arrayFilters: [{ 'selectedItem._id': update._id }] },
        );
      },
      deleteItem: async (itemId: Types.ObjectId) => {
        const list = await this.listService.findListById(listId.toString());
        const storedItem = list.items.find(({ _id }) => _id.equals(itemId));

        if (!storedItem) {
          throw new BadRequestException('Item not found.');
        }

        await this.listModel.updateOne(
          { _id: listId },
          { $pull: { items: { _id: itemId } } },
        );
      },
    };
  }
}
