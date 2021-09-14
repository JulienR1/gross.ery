import React from 'react';
import Home from './screens/Home';
import {Subscribe} from './screens/Subscribe';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './navigation/routes';
import GrosseryList from './components/GrosseryList';

const Stack = createStackNavigator();

const App = () => {
  return (
    // TODO: Require internet connection to function properly.
    // create custom hook
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.Home}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Home} component={Home} />
        <Stack.Screen name={Routes.Subscribe} component={Subscribe} />
        <Stack.Screen name={Routes.List} component={GrosseryList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
