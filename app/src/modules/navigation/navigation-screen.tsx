import React, { useContext, useEffect } from 'react';

import { Screen } from '~/screens';
import { ScreenWrapper } from '~/screens/components';

import {
  completeClose,
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
  const { dispatch, getScreenState, getProps } = useContext(NavigationContext);

  useEffect(() => {
    dispatch(registerScreen(name));
    return () => dispatch(unregisterScreen(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (isRoot) {
      dispatch(updateRootScreen(name));
    }
  }, [isRoot, dispatch, name]);

  const onScreenClosed = () => dispatch(completeClose());

  const screenState = getScreenState(name);
  const showComponent = isRoot || screenState.isActive;

  return showComponent ? (
    <ScreenWrapper
      secondaryScreen={!isRoot}
      isClosing={screenState.isClosing}
      onClosed={onScreenClosed}>
      <ScreenComponent {...getProps(name)} />
    </ScreenWrapper>
  ) : null;
};
