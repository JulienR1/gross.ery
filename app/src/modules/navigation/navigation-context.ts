import { createContext, useContext } from 'react';

import { GlobalNavigationPayload, NavigationHook } from './types';

const NavigationContext = createContext<GlobalNavigationPayload>(
  {} as GlobalNavigationPayload,
);

const useNavigation: NavigationHook = () => useContext(NavigationContext);

export { NavigationContext, useNavigation };
