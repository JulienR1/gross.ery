import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from '../list/schemas/list.schema';

@Injectable()
export class AdminService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async addMissingItemIds() {
    const updatedItems = [];
    const lists = await this.listModel.find({
      items: { $exists: true, $not: { $size: 0 } },
    });
    lists.forEach((list) => {
      list.items.forEach((item) => {
        if (!item._id) {
          item._id = new Types.ObjectId();
          updatedItems.push(item);
        }
      });
      list.save();
    });
    return updatedItems;
  }
}
