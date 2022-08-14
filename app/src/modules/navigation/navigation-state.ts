import { Screen } from '~/screens';

import { ActiveScreen } from './types';

export interface INavigationState {
  rootScreen: Screen;
  availableScreens: Screen[];
  activeStack: ActiveScreen[];
  pendingScreen?: ActiveScreen;
}

export const initialState: INavigationState = {
  rootScreen: Screen.Invitation,
  availableScreens: [],
  activeStack: [{ screen: Screen.Invitation }],
};
