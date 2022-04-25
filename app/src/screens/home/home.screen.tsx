import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAuthorization } from '~/modules/authorization';
import { config } from '~/modules/config';
import { useNavigation } from '~/modules/navigation';

import { Screen } from '../screen.enum';
import { Footer } from './components';

export const HomeScreen = () => {
  const { loadScreen } = useNavigation();
  const { updateAuthorization } = useAuthorization();

  return (
    <>
      <Text>HOME</Text>

      {!config.IS_PROD && (
        <TouchableOpacity onPress={() => updateAuthorization(false)}>
          <Text>Un-authorize</Text>
        </TouchableOpacity>
      )}

      <Footer />
    </>
  );
};
