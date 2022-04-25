import React from 'react';
import { SafeAreaView } from 'react-native';

import { AuthorizationProvider } from './modules/authorization';
import { NavigationModule } from './modules/navigation';
import { rootStyles } from './styles';

const App = () => {
  return (
    <SafeAreaView style={rootStyles.body}>
      <AuthorizationProvider>
        <NavigationModule />
      </AuthorizationProvider>
    </SafeAreaView>
  );
};

export default App;
