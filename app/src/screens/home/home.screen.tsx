import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { useAuthorization } from '~/modules/authorization';
import { config } from '~/modules/config';
import { useNavigation } from '~/modules/navigation';
import { devStyles } from '~/styles/dev-styles';

import { Screen } from '../screen.enum';
import { Footer } from './components';

export const HomeScreen = () => {
  const { loadScreen } = useNavigation();
  const { updateAuthorization } = useAuthorization();

  return (
    <>
      <Text>HOME</Text>

      {!config.IS_PROD && (
        <View style={devStyles.container}>
          <TouchableOpacity
            onPress={() => updateAuthorization(false)}
            style={devStyles.wrapper}>
            <Text style={devStyles.text}>Un-authorize</Text>
          </TouchableOpacity>
        </View>
      )}

      <Footer />
    </>
  );
};
