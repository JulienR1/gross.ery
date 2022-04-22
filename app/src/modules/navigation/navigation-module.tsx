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
    <NavigationProvider>
      {!isAuthorized ? (
        <NavigationScreen
          name={Screen.Invitation}
          component={InvitationScreen}
          isRoot
        />
      ) : (
        <>
          <NavigationScreen name={Screen.Home} component={HomeScreen} isRoot />
          <NavigationScreen name={Screen.List} component={ListScreen} />
          <NavigationScreen name={Screen.Register} component={RegisterScreen} />
        </>
      )}
    </NavigationProvider>
  );
};
