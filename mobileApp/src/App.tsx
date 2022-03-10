import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {baseStyle} from './styles/base';
import {ModalContext} from './contexts/ModalContext';
import {FocusContext} from './contexts/FocusContext';
import {NavigationModule} from './components/NavigationModule';
import {UpdateBanner} from './components/UpdateBanner';
import {NotificationProvider} from './contexts/NotificationContext';
import {InvitationGuard} from './components/InvitationGuard';
import {Footer} from './components/Footer';

const App = () => {
  return (
    <SafeAreaProvider style={baseStyle.body}>
      <Footer>
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
      </Footer>
    </SafeAreaProvider>
  );
};

export default App;
