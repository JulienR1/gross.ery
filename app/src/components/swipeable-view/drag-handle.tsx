import React from 'react';
import { View } from 'react-native';

import { dragHandleStyles } from './styles';

export const DragHandle = () => {
  const { container, handle } = dragHandleStyles;

  return (
    <View style={container}>
      <View style={handle} />
    </View>
  );
};
