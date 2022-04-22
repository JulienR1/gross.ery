import React, { useContext, useEffect } from 'react';

import { Screen } from '~/screens';

import {
  registerScreen,
  unregisterScreen,
  updateRootScreen,
} from './navigation-action';
import { NavigationContext } from './navigation-context';

interface IProps {
  name: Screen;
  component: React.FC;
  isRoot?: boolean;
}

export const NavigationScreen = ({
  name,
  component: ScreenComponent,
  isRoot = false,
}: IProps) => {
  const { dispatch, isActive, getProps } = useContext(NavigationContext);

  useEffect(() => {
    dispatch(registerScreen(name));
    return () => dispatch(unregisterScreen(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (isRoot) {
      dispatch(updateRootScreen(name));
    }
  }, [isRoot, name]);

  const showComponent = isRoot || isActive(name);
  return showComponent ? <ScreenComponent {...getProps(name)} /> : null;
};
