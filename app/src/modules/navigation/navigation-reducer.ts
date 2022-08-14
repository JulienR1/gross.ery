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
    case NavigationType.UPDATE_ROOT:
      return onUpdateRootScreen(state, action.payload);
    case NavigationType.REGISTER:
      return onRegisterScreen(state, action.payload);
    case NavigationType.UNREGISTER:
      return onUnregisterScreen(state, action.payload);
    case NavigationType.SELECT:
      return onSelectScreen(state, action.payload);
    case NavigationType.BEGIN_CLOSE:
      return onBeginClose(state);
    case NavigationType.COMPLETE_CLOSE:
      return onCompleteClose(state);
    case NavigationType.REPLACE:
      return onReplaceScreen(state, action.payload);
    default:
      return state;
  }
}

function onUpdateRootScreen(
  state: INavigationState,
  rootScreen: Screen,
): INavigationState {
  return {
    ...state,
    rootScreen,
    activeStack: [{ screen: rootScreen }],
  };
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

function onUnregisterScreen(
  state: INavigationState,
  screen: Screen,
): INavigationState {
  return {
    ...state,
    availableScreens: state.availableScreens.filter(
      storedScreen => storedScreen !== screen,
    ),
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
    return state;
  }

  return {
    ...state,
    activeStack: [...state.activeStack, { screen, optionalProps }],
  };
}

function onBeginClose(state: INavigationState): INavigationState {
  const newStack = [...state.activeStack];
  const topScreen = newStack.pop();

  if (!topScreen || newStack.length === 0) {
    return state;
  }

  return {
    ...state,
    activeStack: [...newStack, { ...topScreen, isClosing: true }],
  };
}

function onCompleteClose(state: INavigationState): INavigationState {
  const newStack = [...state.activeStack];
  newStack.pop();

  const newState: INavigationState = {
    ...state,
    activeStack: newStack,
    pendingScreen: undefined,
  };

  return state.pendingScreen
    ? onSelectScreen(newState, state.pendingScreen)
    : newState;
}

function onReplaceScreen(
  state: INavigationState,
  { screen, optionalProps }: NavigationSelectPayload,
): INavigationState {
  const closingState = onBeginClose(state);
  return { ...closingState, pendingScreen: { screen, optionalProps } };
}
