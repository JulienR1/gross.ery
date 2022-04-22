import React from 'react';

import { NavigationProvider } from '~/navigation';
import { NavigationScreen } from '~/navigation/navigation-screen';
import {
  HomeScreen,
  InvitationScreen,
  ListScreen,
  RegisterScreen,
  Screen,
} from '~/screens';

export const NavigationModule = () => {
  return (
    <NavigationProvider rootScreen={Screen.Home}>
      <NavigationScreen name={Screen.Invitation} component={InvitationScreen} />
      <NavigationScreen name={Screen.Home} component={HomeScreen} />
      <NavigationScreen name={Screen.List} component={ListScreen} />
      <NavigationScreen name={Screen.Register} component={RegisterScreen} />
    </NavigationProvider>
  );
};
