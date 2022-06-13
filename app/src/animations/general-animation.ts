import { useCallback, useEffect, useRef, useState } from 'react';
import { Animated } from 'react-native';

export const useAnimation = (duration: number) => {
  const animation = useRef(new Animated.Value(0)).current;
  const [animationPercent, setAnimationPercent] = useState(0);

  useEffect(() => {
    animation.addListener(({ value }) => setAnimationPercent(value));
    return () => animation.removeAllListeners();
  }, [animation]);

  const animate = useCallback(
    (toValue: 0 | 1, callback?: () => void) =>
      Animated.timing(animation, {
        toValue,
        duration,
        useNativeDriver: true,
      }).start(callback),
    [animation, duration],
  );

  return { animationPercent, animate };
};
