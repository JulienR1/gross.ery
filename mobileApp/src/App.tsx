import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {baseStyle} from './styles/base';
import {ModalContext} from './contexts/ModalContext';
import {FocusContext} from './contexts/FocusContext';
import {NavigationModule} from './components/NavigationModule';
import {UpdateBanner} from './components/UpdateBanner';
import {NotificationProvider} from './contexts/NotificationContext';
import {InvitationGuard} from './components/InvitationGuard';

const App = () => {
  return (
    <SafeAreaProvider style={baseStyle.body}>
      <FocusContext>
        <NotificationProvider>
          <ModalContext>
            <InvitationGuard>
              <UpdateBanner>
                <NavigationModule />
              </UpdateBanner>
            </InvitationGuard>
          </ModalContext>
        </NotificationProvider>
      </FocusContext>
    </SafeAreaProvider>
  );
};

export default App;
