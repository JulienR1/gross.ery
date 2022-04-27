import React from 'react';
import { Animated } from 'react-native';

import { useDotAnimation } from './animations';
import { styles } from './styles';
import { DotAnimationTiming } from './types';

interface IProps {
  size: number;
  growFactor: number;
  timing: DotAnimationTiming;
}

export const Dot = ({ size, growFactor, timing }: IProps) => {
  const { scaleFactor } = useDotAnimation(timing);

  const scaledSize = (growFactor * scaleFactor + 1) * size;
  const dotStyles = [
    styles.dot,
    {
      height: scaledSize,
      width: scaledSize,
      borderRadius: scaledSize / 2,
    },
  ];
  return <Animated.View style={dotStyles} />;
};
