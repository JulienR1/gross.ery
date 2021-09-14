export interface IListData {
  _id: string;
  items: IItemData[];
}

// TODO: Sync w/ cloudservice models
export interface IItemData {
  name: string;
  checked: boolean;
}
