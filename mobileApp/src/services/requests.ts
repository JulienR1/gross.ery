import {SERVER_ENDPOINT} from '@env';
import {
  removeListFromLocalStorage,
  saveListToLocalStorage,
} from '../localstorage';
import {IListData} from '../models/IListData';
import {IRequestContent} from '../models/IRequestContent';
import {RequestMethod} from '../models/RequestMethod';

const doRequest = (listId: string) => {
  if (!listId) {
    throw new Error('No list id.');
  }

  return {
    getListData: () => getListData(listId),
    addNewItem: (itemName: string) => addNewItem(listId, itemName),
    removeItem: (itemName: string) => removeItem(listId, itemName),
    removeList: () => removeList(listId),
  };
};

const jsonHeaders = () => {
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  return headers;
};

const getListData = (listId: string): Promise<IListData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const rawListData = await fetch(`${SERVER_ENDPOINT}?${listId}`);
      const listData = await rawListData.json();
      await saveListToLocalStorage(listData);
      return resolve(listData);
    } catch (err) {
      await removeListFromLocalStorage(listId);
      return reject();
    }
  });
};

const addNewItem = async (listId: string, itemName: string): Promise<void> => {
  if (itemName) {
    await executeRequestToList('add', listId, {
      method: RequestMethod.POST,
      body: {itemName},
    });
    return;
  }
  throw new Error(`Could not add '${itemName}' to '${listId}'`);
};

const removeItem = async (listId: string, itemName: string) => {
  if (itemName) {
    await executeRequestToList('remove/item', listId, {
      method: RequestMethod.DELETE,
      body: {itemName},
    });
    return;
  }
  throw new Error(`Could not remove '${itemName}' from ${listId}`);
};

const removeList = async (listId: string) => {
  await executeRequestToList('remove', listId, {method: RequestMethod.DELETE});
  await removeListFromLocalStorage(listId);
};

const executeRequestToList = (
  route: string,
  id: string,
  {method, body}: IRequestContent,
) => {
  return fetch(`${SERVER_ENDPOINT}/${route}`, {
    method,
    body: JSON.stringify(body ? {...body, id} : {id}),
    headers: jsonHeaders(),
  });
};

export {doRequest};
