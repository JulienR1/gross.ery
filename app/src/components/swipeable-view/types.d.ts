import { Animated } from 'react-native';

export type PanAnimatedValueXY = Animated.ValueXY & {
  x: { _value: number };
  y: { _value: number };
};
