import { Animated, PanResponder } from 'react-native';

import { PanAnimatedValueXY } from './types';

export const getSwipeablePanResponder = (pan: PanAnimatedValueXY) =>
  PanResponder.create({
    onMoveShouldSetPanResponder: (_, { dx, dy }) =>
      Math.abs(dx) > 2 || Math.abs(dy) > 2,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });
