export interface SavedList {
	code: string;
	items: SavedItem[];
}

export interface SavedItem {
	name: string;
	checked: boolean;
}

export interface AddBody {
	code: string;
	itemName: string;
}

export interface UpdateBody {
	code: string;
	itemName: string;
	newItem: SavedItem;
}
