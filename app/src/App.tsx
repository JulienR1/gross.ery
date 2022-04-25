import React from 'react';
import { SafeAreaView } from 'react-native';

import { ApiProvider } from './modules/api';
import { AuthorizationProvider } from './modules/authorization';
import { NavigationModule } from './modules/navigation';
import { rootStyles } from './styles';

const App = () => {
  const { body } = rootStyles;

  return (
    <SafeAreaView style={body}>
      <AuthorizationProvider>
        <ApiProvider>
          <NavigationModule />
        </ApiProvider>
      </AuthorizationProvider>
    </SafeAreaView>
  );
};

export default App;
