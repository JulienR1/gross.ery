import AsyncStorage from '@react-native-async-storage/async-storage';
import {IListData} from '../models/IListData';
import {ILocalList} from '../models/ILocalList';

const localListPrefix = '@list_';
const invitationPrefix = '@invitation_';

const saveListToLocalStorage = async (listToSave: IListData) => {
  const dataToSave: ILocalList = {
    id: listToSave._id,
    name: listToSave.name,
    itemCount: listToSave.items.length,
    lastUpdateTime: new Date(),
  };

  return AsyncStorage.setItem(
    `${localListPrefix}${dataToSave.id}`,
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

const removeListFromLocalStorage = async (id: string): Promise<void> => {
  return AsyncStorage.removeItem(`${localListPrefix}${id}`);
};

const saveInvitationStatus = async (status = true) => {
  return AsyncStorage.setItem(`${invitationPrefix}approved`, status.toString());
};
const getInvitationStatus = async () => {
  return AsyncStorage.getItem(`${invitationPrefix}approved`);
};

export {
  saveListToLocalStorage,
  getAllLocalListData,
  removeListFromLocalStorage,
  saveInvitationStatus,
  getInvitationStatus,
};
