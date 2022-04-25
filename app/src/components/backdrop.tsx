import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { rootStyles } from '~/styles';

interface IProps {
  opacityFactor: number;
  onPress: () => void;
}

export const Backdrop = ({ opacityFactor, onPress }: IProps) => {
  const { backdrop } = rootStyles;
  const viewStyles = [backdrop, { opacity: backdrop.opacity * opacityFactor }];

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={viewStyles} />
    </TouchableWithoutFeedback>
  );
};
