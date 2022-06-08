import { useCallback, useEffect } from 'react';
import { BackHandler } from 'react-native';

export const useBackButton = (canGoBack: boolean, onBack: () => void) => {
  const goBack = useCallback(() => {
    if (canGoBack) {
      onBack();
    } else {
      BackHandler.exitApp();
    }
    return true;
  }, [canGoBack, onBack]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => BackHandler.removeEventListener('hardwareBackPress', goBack);
  }, [goBack]);
};
