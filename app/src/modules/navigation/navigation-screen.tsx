import React, { useCallback, useContext, useEffect } from 'react';

import { Screen } from '~/screens';
import { ScreenWrapper } from '~/screens/components';

import {
  completeClose,
  registerScreen,
  unregisterScreen,
  updateRootScreen,
} from './navigation-action';
import { NavigationContext } from './navigation-context';
import { ScreenFC, ScreenProps } from './types';

interface IProps {
  name: Screen;
  component: ScreenFC;
  isRoot?: boolean;
}

export const NavigationScreen = <T extends ScreenProps>({
  name,
  component: ScreenComponent,
  isRoot = false,
}: IProps) => {
  const { dispatch, getScreen } = useContext(NavigationContext);

  useEffect(() => {
    dispatch(registerScreen(name));
    return () => dispatch(unregisterScreen(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (isRoot) {
      dispatch(updateRootScreen(name));
    }
  }, [isRoot, dispatch, name]);

  const onScreenClosed = useCallback(
    () => dispatch(completeClose()),
    [dispatch],
  );

  const { isActive, isClosing, props } = getScreen(name);

  return isActive ? (
    <ScreenWrapper
      isClosing={isClosing}
      secondaryScreen={!isRoot}
      onClosed={onScreenClosed}>
      <ScreenComponent<T> {...props} />
    </ScreenWrapper>
  ) : null;
};
