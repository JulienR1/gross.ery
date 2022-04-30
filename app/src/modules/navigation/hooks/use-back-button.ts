import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

import { ActiveScreen } from '../types';

export const useBackButton = (
  { screen }: ActiveScreen,
  closeScreen: () => void,
) => {
  const goBack = useCallback(() => {
    if (screen) {
      closeScreen();
    } else {
      BackHandler.exitApp();
    }
    return true;
  }, [screen, closeScreen]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => BackHandler.removeEventListener('hardwareBackPress', goBack);
  }, [goBack]);
};
