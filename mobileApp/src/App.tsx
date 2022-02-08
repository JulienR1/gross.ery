import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {baseStyle} from './styles/base';
import {ModalContext} from './contexts/ModalContext';
import {FocusContext} from './contexts/FocusContext';
import {NavigationModule} from './components/NavigationModule';
import {UpdateBanner} from './components/UpdateBanner';
import {NotificationProvider} from './contexts/NotificationContext';

const App = () => {
  return (
    <SafeAreaProvider style={baseStyle.body}>
      <FocusContext>
        <NotificationProvider>
          <ModalContext>
            <UpdateBanner>
              <NavigationModule />
            </UpdateBanner>
          </ModalContext>
        </NotificationProvider>
      </FocusContext>
    </SafeAreaProvider>
  );
};

export default App;
