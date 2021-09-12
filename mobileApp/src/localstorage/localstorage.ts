import AsyncStorage from '@react-native-async-storage/async-storage';
import {ILocalList} from '../models/ILocalList';

const localListPrefix = '@list_';

const saveListToLocalStorage = async (
  id: string,
  name: string,
  itemCount: number,
) => {
  const dataToSave: ILocalList = {
    id,
    name,
    itemCount,
    lastUpdateTime: new Date(),
  };

  return AsyncStorage.setItem(
    `${localListPrefix}${id}`,
    JSON.stringify(dataToSave),
  );
};

const readAllLocalListKeys = async () => {
  const allKeys = await AsyncStorage.getAllKeys();
  return allKeys.filter(key => key.startsWith(localListPrefix));
};

const getLocalListDataFromKey = async (
  key: string,
): Promise<ILocalList | undefined> => {
  if (key.startsWith(localListPrefix)) {
    const rawListData = await AsyncStorage.getItem(key);
    if (rawListData) {
      return JSON.parse(rawListData);
    }
  }
  return undefined;
};

const getAllLocalListData = async (): Promise<ILocalList[]> => {
  const keys = await readAllLocalListKeys();
  const listDataPromises = keys.map(key => getLocalListDataFromKey(key));
  const listData = await Promise.all(listDataPromises);
  return listData.filter(
    dataToFilter => dataToFilter !== undefined,
  ) as ILocalList[];
};

export {saveListToLocalStorage, getAllLocalListData};
