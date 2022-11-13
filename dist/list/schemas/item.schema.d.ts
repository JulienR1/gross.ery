/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
import { Types } from 'mongoose';
export declare class Item {
    _id: Types.ObjectId;
    name: string;
    checked: boolean;
}
export declare const ItemSchema: import("mongoose").Schema<import("mongoose").Document<Item, any, any>, import("mongoose").Model<import("mongoose").Document<Item, any, any>, any, any, any>, {}, {}>;
