import { Screen } from '~/screens';

export type ScreenProps = Record<string, unknown>;

export type ScreenFC = FC<ScreenProps>;

export type ScreenState = {
  isActive: boolean;
  isClosing: boolean;
  props?: ScreenProps;
};

export interface GlobalNavigationPayload extends NavigationPayload {
  dispatch: Dispatch<NavigationAction>;
  getScreen: (screen: Screen) => ScreenState;
}

export type NavigationPayload = {
  loadScreen: <T extends ScreenProps>(
    screen: Screen,
    optionalProps?: T,
  ) => void;
  replaceScreen: <T extends ScreenProps>(
    screen: Screen,
    optionalProps?: T,
  ) => void;
  closeScreen: () => void;
};

export type NavigationHook = () => NavigationPayload;

export type ActiveScreen = {
  screen: Screen;
  optionalProps?: ScreenProps;
  isClosing?: boolean;
};
