import {saveListToLocalStorage} from '../../localstorage';
import {api} from '../../services/api';
import {ListEntity} from 'shared';
import {RequestMethod} from '../../models/RequestMethod';

export const recordList = async (idToRecord: string) => {
  if (idToRecord) {
    try {
      const listData = await fetchListData(idToRecord);
      await saveListToLocalStorage(listData);
    } catch (exception) {
      console.log('The provided id does not exist.');
    }
  }
};

export const fetchListData = async (listId: string) => {
  try {
    const list = await api<ListEntity>(`list/${listId}`);
    if (!list) {
      throw new Error('Could not find list.');
    }
    return list;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const createList = async (listName: string) => {
  const payload = {name: listName};

  const createdList = await api<ListEntity>('list', {
    method: RequestMethod.POST,
    body: JSON.stringify(payload),
  });
  if (!createdList) {
    throw new Error('Could not create list.');
  }

  return createdList.id;
};
