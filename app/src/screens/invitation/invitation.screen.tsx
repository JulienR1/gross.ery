import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useAuthorization } from '~/modules/authorization';

export const InvitationScreen = () => {
  const { updateAuthorization } = useAuthorization();

  return (
    <>
      <Text>AUTH</Text>
      <TouchableOpacity onPress={() => updateAuthorization(true)}>
        <Text>Get authorized</Text>
      </TouchableOpacity>
    </>
  );
};
