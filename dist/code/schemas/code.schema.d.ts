/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
export declare type CodeDocument = Code & Document;
export declare class Code {
    code: string;
}
export declare const CodeSchema: import("mongoose").Schema<import("mongoose").Document<Code, any, any>, import("mongoose").Model<import("mongoose").Document<Code, any, any>, any, any, any>, {}, {}>;
