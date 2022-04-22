import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { AuthorizationProvider } from './modules/authorization';
import { NavigationModule } from './modules/navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.body}>
      <GestureHandlerRootView style={styles.body}>
        <AuthorizationProvider>
          <NavigationModule />
        </AuthorizationProvider>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
});

export default App;
