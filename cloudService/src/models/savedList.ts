import { ObjectId } from "bson";

export interface SavedList {
	_id?: ObjectId;
	name: string;
	items: SavedItem[];
}

export interface SavedItem {
	name: string;
	checked: boolean;
}

export interface NewBody {
	listName: string;
}

export interface AddBody {
	id: string;
	itemName: string;
}

export interface UpdateBody {
	id: string;
	itemName: string;
	newValues: SavedItem;
}

export interface RemoveBody {
	id: string;
}

export interface RemoveItemBody {
	id: string;
	itemName: string;
}
