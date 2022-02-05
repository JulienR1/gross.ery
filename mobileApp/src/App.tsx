import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {baseStyle} from './styles/base';
import {ModalContext} from './contexts/ModalContext';
import {FocusContext} from './contexts/FocusContext';
import {NavigationModule} from './components/NavigationModule';

const App = () => {
  return (
    <SafeAreaProvider style={baseStyle.body}>
      <FocusContext>
        <ModalContext>
          <NavigationModule />
        </ModalContext>
      </FocusContext>
    </SafeAreaProvider>
  );
};

export default App;
