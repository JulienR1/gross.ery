import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useSlideAnimations = (duration: number, onClosed?: () => void) => {
  const slideAnimation = useRef(new Animated.Value(0)).current;
  const [slidePercent, setSlidePercent] = useState(0);

  useEffect(() => {
    slideAnimation.addListener(({ value }) => setSlidePercent(value));
    return () => slideAnimation.removeAllListeners();
  }, [slideAnimation]);

  const animateSlide = useCallback(
    (toValue: 0 | 1, callback?: () => void) =>
      Animated.timing(slideAnimation, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(callback),
    [slideAnimation, duration],
  );

  const slideIn = useCallback(() => animateSlide(1), [animateSlide]);

  const slideOut = useCallback(
    () => animateSlide(0, onClosed),
    [animateSlide, onClosed],
  );

  return { slidePercent, slideIn, slideOut };
};
