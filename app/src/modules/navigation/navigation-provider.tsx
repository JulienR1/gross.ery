import React, { ReactNode, useEffect, useReducer } from 'react';
import { BackHandler } from 'react-native';

import { NavigationContext } from './navigation-context';
import { navigationReducer } from './navigation-reducer';
import { getSelectors } from './navigation-selectors';
import { initialState } from './navigation-state';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const NavigationProvider = ({ children }: IProps) => {
  const [{ currentScreen }, dispatch] = useReducer(navigationReducer, {
    ...initialState,
  });

  const selectors = getSelectors(currentScreen, dispatch);
  const { closeScreen } = selectors;

  useEffect(() => {
    const goBack = () => {
      if (currentScreen.screen) {
        closeScreen();
      } else {
        BackHandler.exitApp();
      }
      return true;
    };

    BackHandler.addEventListener('hardwareBackPress', goBack);
    return () => BackHandler.removeEventListener('hardwareBackPress', goBack);
  }, [currentScreen, closeScreen]);

  return (
    <NavigationContext.Provider value={selectors}>
      {children}
    </NavigationContext.Provider>
  );
};
