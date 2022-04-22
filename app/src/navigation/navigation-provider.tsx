import React, {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

import { Screen } from '~/screens';

import { close, NavigationAction, selectScreen } from './navigation-action';
import { navigationReducer } from './navigation-reducer';
import { initialState } from './navigation-state';

interface IProps {
  children: ReactNode | ReactNode[];
  rootScreen: Screen;
}

interface GlobalNavigationPayload extends NavigationPayload {
  dispatch: Dispatch<NavigationAction>;
  isActive: (screen: Screen) => boolean;
  getProps: (screen: Screen) => Record<string, unknown>;
}

type NavigationPayload = {
  loadScreen: (screen: Screen, optionalProps?: Record<string, unknown>) => void;
  closeScreen: () => void;
};

export const NavigationContext = createContext<GlobalNavigationPayload>(
  {} as GlobalNavigationPayload,
);

export const useNavigation: () => NavigationPayload = () =>
  useContext(NavigationContext);

export const NavigationProvider = ({ children, rootScreen }: IProps) => {
  const [{ currentScreen }, dispatch] = useReducer(navigationReducer, {
    ...initialState,
    rootScreen,
  });

  const isActive = (screen: Screen) =>
    screen === rootScreen || currentScreen?.screen === screen;

  const getProps = () => currentScreen?.optionalProps ?? {};

  const loadScreen = (
    screen: Screen,
    optionalProps?: Record<string, unknown>,
  ) => dispatch(selectScreen(screen, optionalProps));

  const closeScreen = () => dispatch(close());

  return (
    <NavigationContext.Provider
      value={{ dispatch, isActive, getProps, loadScreen, closeScreen }}>
      {children}
    </NavigationContext.Provider>
  );
};
