import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationModule } from './navigation';

const App = () => {
  return (
    <SafeAreaView style={styles.body}>
      <GestureHandlerRootView style={styles.body}>
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
