import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {GrosseryList} from '../../screens/GrosseryList';
import {Home} from '../../screens/Home';
import {NewList} from '../../screens/NewList';
import {Routes} from '../../navigation/routes';
import {useConnectivityWarning} from '../../hooks/ConnectivityWarning';
import {Loader} from '../Loader';

const Stack = createStackNavigator();

export function NavigationModule() {
  const isLoaded = useConnectivityWarning();

  if (!isLoaded) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.Home}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Home} component={Home} />
        <Stack.Screen name={Routes.NewList} component={NewList} />
        <Stack.Screen name={Routes.List} component={GrosseryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
