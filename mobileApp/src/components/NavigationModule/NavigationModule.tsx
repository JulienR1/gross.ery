import React, {useEffect, useState} from 'react';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GrosseryList} from '../../screens/GrosseryList';
import {Home} from '../../screens/Home';
import {NewList} from '../../screens/NewList';
import {Routes} from '../../navigation/routes';
import {useConnectivityWarning} from '../../hooks/ConnectivityWarning';
import {useAutomaticSubscriber} from '../../hooks/AutomaticSubscriber';
import {Loader} from '../Loader';

const Stack = createStackNavigator();

export function NavigationModule() {
  const navigationRef = useNavigationContainerRef();
  const [screenNavigationEvents, setScreenNavigationEvents] = useState({});

  const {isLoaded, preventNavigation} = useConnectivityWarning();
  useAutomaticSubscriber({navigationRef});

  useEffect(() => {
    setScreenNavigationEvents({
      beforeRemove: (e: any) => preventNavigation && e.preventDefault(),
    });
  }, [preventNavigation]);

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenListeners={screenNavigationEvents}
        initialRouteName={Routes.Home}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Home} component={Home} />
        <Stack.Screen name={Routes.NewList} component={NewList} />
        <Stack.Screen name={Routes.List} component={GrosseryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
