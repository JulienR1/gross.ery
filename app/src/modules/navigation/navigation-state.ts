import { Screen } from '~/screens';

export interface INavigationState {
  rootScreen: Screen;
  availableScreens: Screen[];
  currentScreen: {
    screen: Screen | undefined;
    optionalProps?: Record<string, unknown>;
  };
}

export const initialState: INavigationState = {
  rootScreen: Screen.Home,
  availableScreens: [],
  currentScreen: { screen: undefined },
};
