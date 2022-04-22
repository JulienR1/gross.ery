import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '~/navigation';

export const InvitationScreen = () => {
  const { closeScreen } = useNavigation();

  return (
    <>
      <Text>AUTH</Text>
      <TouchableOpacity onPress={() => closeScreen()}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </>
  );
};
