export type ScreenProps = Record<string, unknown>;

export interface GlobalNavigationPayload extends NavigationPayload {
  dispatch: Dispatch<NavigationAction>;
  getScreenState: (screen: Screen) => { isActive: boolean; isClosing: boolean };
  getProps: (screen: Screen) => ScreenProps;
}

export type NavigationPayload = {
  loadScreen: (screen: Screen, optionalProps?: ScreenProps) => void;
  closeScreen: () => void;
};

export type NavigationHook = () => NavigationPayload;

export type ActiveScreen = {
  screen: Screen | undefined;
  optionalProps?: ScreenProps;
  isClosing?: boolean;
};
