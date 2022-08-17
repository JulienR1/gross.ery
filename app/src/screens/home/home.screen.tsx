import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ScreenButton } from '~/components';
import { useAuthorization } from '~/modules/authorization';
import { config } from '~/modules/config';
import { useModal } from '~/modules/modal';
import { DeleteModal } from '~/modules/modal/instances';
import { CancelEditModal } from '~/modules/modal/instances/cancel-edit-modal';
import { useNavigation } from '~/modules/navigation';
import { removeAllStoredLists } from '~/modules/storage';
import { rootStyles } from '~/styles';
import { devStyles } from '~/styles/dev-styles';

import { Screen } from '../screen.enum';
import { Footer, ListShowcase } from './components';

export const HomeScreen = () => {
  const { loadScreen } = useNavigation();
  const { updateAuthorization } = useAuthorization();

  const loadRegisterScreen = useCallback(
    () => loadScreen(Screen.Register),
    [loadScreen],
  );

  const { openModal } = useModal();

  const { title } = rootStyles;
  return (
    <>
      <Text style={title}>Mes listes</Text>

      <ListShowcase />
      <ScreenButton prompt="Ajouter une liste" onPress={loadRegisterScreen} />

      <Footer />

      {!config.IS_PROD && (
        <View style={devStyles.container}>
          <TouchableOpacity
            onPress={() => updateAuthorization(false)}
            style={devStyles.wrapper}>
            <Text style={devStyles.text}>Un-authorize</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={devStyles.wrapper}
            onPress={() =>
              openModal({ component: CancelEditModal }).then(data =>
                console.log(data),
              )
            }>
            <Text style={devStyles.text}>Open modal</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={devStyles.wrapper}
            onPress={() =>
              openModal({
                component: DeleteModal,
                props: {
                  message: 'really?',
                },
              }).then(data => console.log(data))
            }>
            <Text style={devStyles.text}>Open modal 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={devStyles.wrapper}
            onPress={() => removeAllStoredLists()}>
            <Text style={devStyles.text}>Clear lists</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
