import React from 'react';
import {Home} from './screens/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Routes} from './navigation/routes';
import {GrosseryList} from './screens/GrosseryList';
import {NewList} from './screens/NewList';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {baseStyle} from './styles/base';
import {ModalContext} from './contexts/ModalContext';
import {FocusContext} from './contexts/FocusContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    // TODO: Require internet connection to function properly.
    // create custom hook
    <SafeAreaProvider style={baseStyle.body}>
      <FocusContext>
        <ModalContext>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName={Routes.Home}
              screenOptions={{headerShown: false}}>
              <Stack.Screen name={Routes.Home} component={Home} />
              <Stack.Screen name={Routes.NewList} component={NewList} />
              <Stack.Screen name={Routes.List} component={GrosseryList} />
            </Stack.Navigator>
          </NavigationContainer>
        </ModalContext>
      </FocusContext>
    </SafeAreaProvider>
  );
};

export default App;
