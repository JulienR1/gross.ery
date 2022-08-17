import AsyncStorage from '@react-native-async-storage/async-storage';

import { Keys } from './keys';
import { ILocalList, Subscriber } from './types';

const subscribers: Subscriber[] = [];

const notifySubscribers = async (lists: ILocalList[]) => {
  subscribers.forEach(callback => callback(lists));
};

export const subscribe = (callback: Subscriber) => {
  subscribers.push(callback);
  return () => {
    subscribers.filter(currentCallback => currentCallback !== callback);
  };
};

export const getIsAuthorized = async (): Promise<boolean> => {
  const authorizedStr = await AsyncStorage.getItem(Keys.Authorized);
  return authorizedStr === 'true';
};

export const setIsAuthorized = async (isAuthorized = true): Promise<void> => {
  await AsyncStorage.setItem(Keys.Authorized, isAuthorized.toString());
};

export const getStoredLists = async (): Promise<ILocalList[]> => {
  const storedListsStr = await AsyncStorage.getItem(Keys.Lists);
  const storedLists: ILocalList[] = JSON.parse(storedListsStr ?? '[]');
  return storedLists.map(list => ({
    ...list,
    lastUpdate: new Date(list.lastUpdate),
  }));
};

export const addStoredList = async (id: string, name: string) => {
  const newList: ILocalList = { id, name, items: [], lastUpdate: new Date() };

  const previousLists = await getStoredLists();
  const updatedLists = [...previousLists, newList];
  await AsyncStorage.setItem(Keys.Lists, JSON.stringify(updatedLists));
  await notifySubscribers(updatedLists);
};

export const removeStoredListFromId = async (listId: string) => {
  await removedStoredListsFromIds([listId]);
};

export const removedStoredListsFromIds = async (listIds: string[]) => {
  const lists = await getStoredLists();
  const updatedLists = lists.filter(list => !listIds.includes(list.id));
  await AsyncStorage.setItem(Keys.Lists, JSON.stringify(updatedLists));
  await notifySubscribers(updatedLists);
};

export const removeAllStoredLists = async () => {
  const lists = await getStoredLists();
  const listIds = lists.map(list => list.id);
  await removedStoredListsFromIds(listIds);
};
