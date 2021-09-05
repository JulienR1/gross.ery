export interface SavedList {
	code: string;
	items?: SavedItem[];
}

export interface SavedItem {
	name: string;
	checked: boolean;
}
