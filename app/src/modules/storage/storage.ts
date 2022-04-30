import AsyncStorage from '@react-native-async-storage/async-storage';

import { Keys } from './keys';
import { ILocalList } from './types';

export const getIsAuthorized = async (): Promise<boolean> => {
  const authorizedStr = await AsyncStorage.getItem(Keys.Authorized);
  return authorizedStr === 'true';
};

export const setIsAuthorized = async (isAuthorized = true): Promise<void> => {
  await AsyncStorage.setItem(Keys.Authorized, isAuthorized.toString());
};

export const getStoredLists = async (): Promise<ILocalList[]> => {
  return [];
};
