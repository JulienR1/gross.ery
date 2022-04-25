import React from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { rootStyles } from '~/styles';

interface IProps {
  opacityFactor: number;
  onPress: () => void;
}

export const Backdrop = ({ opacityFactor, onPress }: IProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[
          rootStyles.backdrop,
          { opacity: rootStyles.backdrop.opacity * opacityFactor },
        ]}
      />
    </TouchableWithoutFeedback>
  );
};
