export type ScreenProps = Record<string, unknown>;

export interface GlobalNavigationPayload extends NavigationPayload {
  dispatch: Dispatch<NavigationAction>;
  isActive: (screen: Screen) => boolean;
  getProps: (screen: Screen) => ScreenProps;
}

export type NavigationPayload = {
  loadScreen: (screen: Screen, optionalProps?: ScreenProps) => void;
  closeScreen: () => void;
};

export type NavigationHook = () => NavigationPayload;
