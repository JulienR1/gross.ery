import {
  CreateItemDto,
  DeleteCheckedItemsDto,
  DeleteItemDto,
  DeleteListDto,
  ItemEntity,
  ListEntity,
  UpdateItemDto,
} from 'shared';
import {
  removeListFromLocalStorage,
  saveListToLocalStorage,
} from '../localstorage';
import {RequestMethod} from '../models/RequestMethod';
import {api} from './api';

const doRequest = (listId: string) => {
  if (!listId) {
    throw new Error('No list id.');
  }

  return {
    getListData: () => getListData(listId),
    addNewItem: (itemName: string) => addNewItem(listId, itemName),
    updateItem: (itemId: string, newValues: ItemEntity) =>
      updateItem(listId, itemId, newValues),
    removeItem: (itemName: string) => removeItem(listId, itemName),
    removeCheckedItems: () => removeCheckedItems(listId),
    removeList: () => removeList(listId),
  };
};

const getListData = async (listId: string): Promise<ListEntity | undefined> => {
  const list = await api<ListEntity>(`list/${listId}`);
  if (list) {
    await saveListToLocalStorage(list);
    return list;
  } else {
    await removeListFromLocalStorage(listId);
    throw new Error('Could not find the requested list.');
  }
};

const addNewItem = async (listId: string, itemName: string): Promise<void> => {
  if (itemName) {
    const payload: CreateItemDto = {listId, itemName};
    await api('list/item', {
      method: RequestMethod.POST,
      body: JSON.stringify(payload),
    });
    return;
  }
  throw new Error(`Could not add '${itemName}' to '${listId}'`);
};

const updateItem = async (
  listId: string,
  itemId: string,
  newValues: ItemEntity,
) => {
  if (itemId && newValues) {
    const payload: UpdateItemDto = {listId, item: {...newValues, id: itemId}};

    await api(`list/item`, {
      method: RequestMethod.PUT,
      body: JSON.stringify(payload),
    });
    return;
  }
  throw new Error(`Could not update item '${itemId}'`);
};

const removeItem = async (listId: string, itemId: string) => {
  if (itemId) {
    const payload: DeleteItemDto = {listId, itemId};
    await api('list/item', {
      method: RequestMethod.DELETE,
      body: JSON.stringify(payload),
    });
    return;
  }
  throw new Error(`Could not remove '${itemId}' from ${listId}`);
};

const removeCheckedItems = async (listId: string) => {
  const payload: DeleteCheckedItemsDto = {listId};
  const res = await api('list/item/checked', {
    method: RequestMethod.DELETE,
    body: JSON.stringify(payload),
  });
};

const removeList = async (listId: string) => {
  const payload: DeleteListDto = {listId};
  await api('list', {
    method: RequestMethod.DELETE,
    body: JSON.stringify(payload),
  });
  await removeListFromLocalStorage(listId);
};

export {doRequest};
