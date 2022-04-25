import { Dispatch } from 'react';

import { Screen } from '~/screens';

import {
  beginClose,
  NavigationAction,
  selectScreen,
} from './navigation-action';
import { ActiveScreen, GlobalNavigationPayload, ScreenProps } from './types';

export const getSelectors = (
  currentScreen: ActiveScreen | undefined,
  dispatch: Dispatch<NavigationAction>,
): GlobalNavigationPayload => {
  const getScreenState = (screen: Screen) => {
    const isActive = currentScreen?.screen === screen;
    return {
      isActive,
      isClosing: isActive && (currentScreen?.isClosing ?? false),
    };
  };

  const getProps = () => currentScreen?.optionalProps ?? {};

  const closeScreen = () => dispatch(beginClose());

  const loadScreen = (screen: Screen, optionalProps?: ScreenProps) =>
    dispatch(selectScreen(screen, optionalProps));

  return {
    dispatch,
    getScreenState,
    getProps,
    closeScreen,
    loadScreen,
  };
};
