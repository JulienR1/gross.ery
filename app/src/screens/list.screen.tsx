import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '~/modules/navigation';
import { ScreenProps } from '~/modules/navigation/types';

export interface ListScreenProps extends ScreenProps {
  listId: string;
}

export const ListScreen = ({ listId }: ListScreenProps) => {
  const { closeScreen } = useNavigation();

  return (
    <>
      <Text>LIST {listId}</Text>
      <TouchableOpacity onPress={() => closeScreen()}>
        <Text>Go back</Text>
      </TouchableOpacity>
    </>
  );
};
