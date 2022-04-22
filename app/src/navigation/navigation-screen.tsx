import React, { useContext, useEffect } from 'react';

import { Screen } from '~/screens';

import { registerScreen } from './navigation-action';
import { NavigationContext } from './navigation-provider';

interface IProps {
  name: Screen;
  component: React.FC;
}

export const NavigationScreen = ({
  name,
  component: ScreenComponent,
}: IProps) => {
  const { dispatch, isActive, getProps } = useContext(NavigationContext);

  useEffect(() => {
    dispatch(registerScreen(name));
  }, [dispatch, name]);

  const showComponent = isActive(name);
  return showComponent ? <ScreenComponent {...getProps(name)} /> : null;
};
