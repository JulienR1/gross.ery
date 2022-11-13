import { Model } from 'mongoose';
import { ListDocument } from '../list/schemas/list.schema';
export declare class AdminService {
    private listModel;
    constructor(listModel: Model<ListDocument>);
    addMissingItemIds(): Promise<any[]>;
}
