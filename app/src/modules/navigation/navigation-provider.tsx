import React, { ReactNode, useReducer } from 'react';

import { Loader } from '~/components';

import { useBackButton } from './hooks';
import { NavigationContext } from './navigation-context';
import { navigationReducer } from './navigation-reducer';
import { getSelectors } from './navigation-selectors';
import { initialState } from './navigation-state';

interface IProps {
  children: ReactNode | ReactNode[];
}

export const NavigationProvider = ({ children }: IProps) => {
  const [navigationState, dispatch] = useReducer(
    navigationReducer,
    initialState,
  );
  const { activeStack, availableScreens } = navigationState;

  const selectors = getSelectors(navigationState, dispatch);
  useBackButton(activeStack[activeStack.length - 1], selectors.closeScreen);

  return (
    <NavigationContext.Provider value={selectors}>
      {availableScreens.length === 0 && <Loader />}
      {children}
    </NavigationContext.Provider>
  );
};
