import React, { ReactNode, useReducer } from 'react';

import { Screen } from '~/screens';

import { close, selectScreen } from './navigation-action';
import { NavigationContext } from './navigation-context';
import { navigationReducer } from './navigation-reducer';
import { initialState } from './navigation-state';
import { ScreenProps } from './types';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const NavigationProvider = ({ children }: IProps) => {
  const [{ currentScreen }, dispatch] = useReducer(navigationReducer, {
    ...initialState,
  });

  const isActive = (screen: Screen) => currentScreen?.screen === screen;

  const getProps = () => currentScreen?.optionalProps ?? {};

  const closeScreen = () => dispatch(close());

  const loadScreen = (screen: Screen, optionalProps?: ScreenProps) =>
    dispatch(selectScreen(screen, optionalProps));

  return (
    <NavigationContext.Provider
      value={{ dispatch, isActive, getProps, loadScreen, closeScreen }}>
      {children}
    </NavigationContext.Provider>
  );
};
