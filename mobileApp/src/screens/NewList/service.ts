import {SERVER_ENDPOINT} from '@env';
import {saveListToLocalStorage} from '../../localstorage';
import {IListData} from '../../models/IListData';

export const recordList = async (idToRecord: string) => {
  if (idToRecord) {
    try {
      const listData: IListData = await fetchListData(idToRecord);
      await saveListToLocalStorage(listData);
    } catch (exception) {
      console.log('The provided id does not exist.');
    }
  }
};

const fetchListData = (listId: string): Promise<IListData> => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(`${SERVER_ENDPOINT}?${listId}`);
      const jsonData = await response.json();
      return resolve(jsonData);
    } catch (exception) {
      return reject();
    }
  });
};
