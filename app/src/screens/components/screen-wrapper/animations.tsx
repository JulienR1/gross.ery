import { useCallback } from 'react';
import { Animated } from 'react-native';

export const useAnimations = (
  slideAnimation: Animated.Value,
  onClosed: () => void,
) => {
  const animateSlide = useCallback(
    (toValue: 0 | 1, callback?: () => void) =>
      Animated.timing(slideAnimation, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }).start(callback),
    [slideAnimation],
  );

  const slideIn = useCallback(() => animateSlide(1), [animateSlide]);

  const slideOut = useCallback(
    () => animateSlide(0, onClosed),
    [animateSlide, onClosed],
  );

  return { slideIn, slideOut };
};
