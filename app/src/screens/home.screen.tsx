import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAuthorization } from '~/modules/authorization';
import { useNavigation } from '~/modules/navigation';

import { Screen } from './screen.enum';

export const HomeScreen = () => {
  const { loadScreen } = useNavigation();
  const { updateAuthorization } = useAuthorization();

  return (
    <>
      <Text>HOME</Text>
      <TouchableOpacity onPress={() => updateAuthorization(false)}>
        <Text>Un-authorize</Text>
      </TouchableOpacity>
    </>
  );
};
