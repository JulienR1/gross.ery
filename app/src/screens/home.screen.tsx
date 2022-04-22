import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '~/navigation';

import { Screen } from './screen.enum';

export const HomeScreen = () => {
  const { loadScreen } = useNavigation();

  return (
    <>
      <Text>HOME</Text>
    </>
  );
};
