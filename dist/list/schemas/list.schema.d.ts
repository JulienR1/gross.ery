/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Item } from './item.schema';
export declare type ListDocument = List & Document;
export declare class List {
    name: string;
    items: Item[];
}
export declare const ListSchema: import("mongoose").Schema<import("mongoose").Document<List, any, any>, import("mongoose").Model<import("mongoose").Document<List, any, any>, any, any, any>, {}, {}>;
