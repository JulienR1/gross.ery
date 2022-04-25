import { Screen } from '~/screens';

import { ActiveScreen } from './types';

export interface INavigationState {
  rootScreen: Screen;
  availableScreens: Screen[];
  currentScreen: ActiveScreen;
}

export const initialState: INavigationState = {
  rootScreen: Screen.Home,
  availableScreens: [],
  currentScreen: { screen: undefined },
};
