import React from 'react';
import { SafeAreaView } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthorizationProvider } from './modules/authorization';
import { NavigationModule } from './modules/navigation';
import { rootStyles } from './styles';

const App = () => {
  return (
    <SafeAreaView style={rootStyles.body}>
      <GestureHandlerRootView style={rootStyles.body}>
        <AuthorizationProvider>
          <NavigationModule />
        </AuthorizationProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default App;
