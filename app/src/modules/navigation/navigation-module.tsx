import React from 'react';

import { useAuthorization } from '~/modules/authorization';
import { NavigationProvider, NavigationScreen } from '~/modules/navigation';
import {
  HomeScreen,
  InvitationScreen,
  ListScreen,
  RegisterScreen,
  Screen,
} from '~/screens';

export const NavigationModule = () => {
  const { isAuthorized } = useAuthorization();

  return (
    <NavigationProvider
      rootScreen={isAuthorized ? Screen.Home : Screen.Invitation}>
      <NavigationScreen name={Screen.Invitation} component={InvitationScreen} />
      <NavigationScreen name={Screen.Home} component={HomeScreen} />
      <NavigationScreen name={Screen.List} component={ListScreen} />
      <NavigationScreen name={Screen.Register} component={RegisterScreen} />
    </NavigationProvider>
  );
};
