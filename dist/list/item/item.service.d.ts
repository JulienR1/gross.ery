import { Model, Types } from 'mongoose';
import { ListDocument } from '../schemas/list.schema';
import { ListService } from '../list';
import { Item } from '../schemas/item.schema';
export declare class ItemService {
    private listModel;
    private listService;
    constructor(listModel: Model<ListDocument>, listService: ListService);
    withList(listId: string): {
        createItem: (itemName: string) => Promise<void>;
        updateItem: (update: Item) => Promise<void>;
        deleteItem: (itemId: Types.ObjectId) => Promise<void>;
        deleteChecked: () => Promise<void>;
    };
}
