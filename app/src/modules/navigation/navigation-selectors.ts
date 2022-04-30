import { Dispatch } from 'react';

import { Screen } from '~/screens';

import {
  beginClose,
  NavigationAction,
  selectScreen,
} from './navigation-action';
import { INavigationState } from './navigation-state';
import { ActiveScreen, GlobalNavigationPayload, ScreenProps } from './types';

export const getSelectors = (
  { availableScreens, activeStack }: INavigationState,
  dispatch: Dispatch<NavigationAction>,
): GlobalNavigationPayload => {
  const getScreen = (screen: Screen) => {
    const isAvailable = availableScreens.includes(screen);
    const activeScreens = activeStack.reduce(
      (allScreens, currentScreen) => ({
        ...allScreens,
        [currentScreen.screen]: { ...currentScreen },
      }),
      {} as { [key in Screen]: ActiveScreen },
    );

    const isActive = isAvailable && activeScreens[screen] !== undefined;
    const isClosing = (isActive && activeScreens[screen].isClosing) ?? false;
    const props = activeScreens[screen]?.optionalProps;

    return { isActive, isClosing, props };
  };

  const closeScreen = () => dispatch(beginClose());

  const loadScreen = (screen: Screen, optionalProps?: ScreenProps) =>
    dispatch(selectScreen(screen, optionalProps));

  return {
    dispatch,
    getScreen,
    closeScreen,
    loadScreen,
  };
};
