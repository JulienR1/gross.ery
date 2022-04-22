import { Screen } from '~/screens';

import {
  NavigationAction,
  NavigationSelectPayload,
  NavigationType,
} from './navigation-action';
import { INavigationState, initialState } from './navigation-state';

export function navigationReducer(
  state = initialState,
  action: NavigationAction,
): INavigationState {
  switch (action.type) {
    case NavigationType.REGISTER:
      return onRegisterScreen(state, action.payload);
    case NavigationType.SELECT:
      return onSelectScreen(state, action.payload);
    case NavigationType.CLOSE:
      return onClose(state);
    default:
      return state;
  }
}

function onRegisterScreen(
  state: INavigationState,
  screen: Screen,
): INavigationState {
  if (state.availableScreens.includes(screen)) {
    return state;
  }

  return {
    ...state,
    availableScreens: [...state.availableScreens, screen],
  };
}

function onSelectScreen(
  state: INavigationState,
  { screen: targetScreen, optionalProps }: NavigationSelectPayload,
): INavigationState {
  const screen = state.availableScreens.find(
    registeredScreen => registeredScreen === targetScreen,
  );

  if (!screen) {
    console.warn(
      `Could not load '${screen}'. Has it been added in the list of possible screen?`,
    );
  }

  return { ...state, currentScreen: { screen, optionalProps } };
}

function onClose(state: INavigationState): INavigationState {
  return {
    ...state,
    currentScreen: { screen: undefined },
  };
}