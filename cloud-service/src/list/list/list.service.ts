import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List, ListDocument } from '../schemas/list.schema';

@Injectable()
export class ListService {
  constructor(@InjectModel(List.name) private listModel: Model<ListDocument>) {}

  async findListById(id: string) {
    const list = await this.listModel.findById(id);
    if (!list) {
      throw new NotFoundException('No list found');
    }
    return list;
  }

  async insertList(name: string) {
    const newList: List = { name, items: [] };
    const inserted = await this.listModel.create(newList);
    return { id: inserted._id.toString() };
  }

  async removeList(id: string) {
    const deletedList = await this.listModel.findByIdAndDelete(id);
    if (!deletedList) {
      throw new NotFoundException('No list to delete');
    }
    return deletedList;
  }
}
