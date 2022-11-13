/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Types, Model } from 'mongoose';
import { List, ListDocument } from '../schemas/list.schema';
export declare class ListService {
    private listModel;
    constructor(listModel: Model<ListDocument>);
    findListById(id: string): Promise<import("mongoose").Document<unknown, any, ListDocument> & List & Document & {
        _id: Types.ObjectId;
    }>;
    insertList(name: string): Promise<{
        id: string;
    }>;
    removeList(id: string): Promise<import("mongoose").Document<unknown, any, ListDocument> & List & Document & {
        _id: Types.ObjectId;
    }>;
}
