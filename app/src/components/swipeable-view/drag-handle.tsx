import React from 'react';
import { View } from 'react-native';

import { dragHandleStyles } from './styles';

export const DragHandle = () => {
  return (
    <View style={dragHandleStyles.container}>
      <View style={dragHandleStyles.handle} />
    </View>
  );
};
