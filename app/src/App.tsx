import React from 'react';
import { LogBox, SafeAreaView } from 'react-native';

import { ApiProvider } from './modules/api';
import { AuthorizationProvider } from './modules/authorization';
import { NavigationModule } from './modules/navigation';
import { rootStyles } from './styles';

// For some reason this error is still present:
// https://github.com/facebook/metro/issues/287
// Concerns a require cycle w/ the fetch api
LogBox.ignoreLogs(['whatwg-fetch']);

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
